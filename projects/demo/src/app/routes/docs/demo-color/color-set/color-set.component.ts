import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Component, DestroyRef, Injector, OnInit, PLATFORM_ID, afterNextRender, effect, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import Color from 'colorjs.io';
import { ButtonModule, FieldModule, ModalDialogService, PuiOverlayService } from 'portal-ui-ng';
import { startWith, takeUntil } from 'rxjs';

@Component({
  selector: 'demo-color-set',
  standalone: true,
  imports: [
    FieldModule,
    ButtonModule,
  ],
  templateUrl: './color-set.component.html',
  styles: ``
})
export class ColorSetComponent implements OnInit {
  name = input.required<string>();
  defaultColor = input.required<{ baseColor: string; stepDownL: number; stepUpL: number; }>();

  formControl = inject(FormBuilder).control({
    baseColor: null as string | null,
    stepDownL: 40,
    stepUpL: 12,
  })

  private injector = inject(Injector);
  private document = inject(DOCUMENT);
  private isServer = isPlatformServer(inject(PLATFORM_ID));
  private dialog = inject(ModalDialogService);
  private destroyRef = inject(DestroyRef);

  colorShades = signal<Color[]>([]);

  constructor() {
    this.formControl.valueChanges.pipe(
      startWith(this.formControl.value),
    ).subscribe(v => {
      if (!v?.baseColor) return;
      const baseColor = new Color(v!.baseColor).to('hsl');
      // 400 300 200 100 50
      const lighter = Array(5)
        .fill(0)
        .map((_, i) => Math.pow((1 + v?.stepUpL! / 100), i + 1))
        .map(multiplier => {
          const c = baseColor.clone();
          c.l *= multiplier;
          c.l = Math.min(100, c.l);
          return c;
        })
      // 600 700 800 900 950
      const darker = Array(5)
        .fill(0)
        .map((_, i) => Math.pow((1 - v?.stepDownL! / 100), i + 1))
        .map(multiplier => {
          const c = baseColor.clone();
          c.l *= multiplier;
          c.l = Math.max(0, c.l);
          return c;
        })
      this.colorShades.set([...lighter.toReversed(), baseColor, ...darker])
    })
    afterNextRender(() => {
      effect(() => {
        const shadeNames = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
        shadeNames.map((name, i) => {
          const c = this.colorShades()[i].to('srgb');
          this.document.body.style.setProperty(`--color-${ this.name() }-${ name }`, `${ Math.floor(c.r * 255) } ${ Math.floor(c.g * 255) } ${ Math.floor(c.b * 255) }`)
        })
      }, { injector: this.injector })
    })
  }

  ngOnInit(): void {
    if (!this.isServer) {
      const color = window.localStorage.getItem(`demo.color-${ this.name() }`);
      if (color == null) {
        this.formControl.setValue(this.defaultColor())
      } else {
        const colorInfo = JSON.parse(color);
        this.formControl.setValue(colorInfo)
      }
      this.formControl.valueChanges.pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe((v) => {
        window.localStorage.setItem(`demo.color-${ this.name() }`, JSON.stringify(v))
      })
    }
  }

  exportColors() {
    const shadeNames = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
    const vars = shadeNames.map((name, i) => {
      const c = this.colorShades()[i].to('srgb');
      return [`--color-${ this.name() }-${ name }`, `${ Math.floor(c.r * 255) } ${ Math.floor(c.g * 255) } ${ Math.floor(c.b * 255) }`];
    })
    this.dialog.open({
      title: this.name(),
      detailsHtml: `<pre class="font-mono border rounded-1 px-2 py-1 select-all">${
vars.map(([name, value]) => {
  return `${ name }: ${ value };`
}).join('\n')
      }
</pre>`
    })
  }
}
