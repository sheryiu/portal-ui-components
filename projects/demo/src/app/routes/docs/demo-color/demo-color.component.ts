import { DOCUMENT } from '@angular/common';
import { Component, Injector, afterNextRender, effect, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Color from 'colorjs.io';
import { BreadcrumbsComponent, FieldModule, LayeredContainerComponent, SidebarModule } from 'phead';
import { startWith } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';

export function toHex(color: Color): string {
  const inSrgb = color.to('srgb');
  return `#${ Math.floor(inSrgb.r * 255).toString(16).padStart(2, '0') }${ Math.floor(inSrgb.g * 255).toString(16).padStart(2, '0') }${ Math.floor(inSrgb.b * 255).toString(16).padStart(2, '0') }`;
}

@Component({
  selector: 'demo-demo-color',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
    FieldModule,
  ],
  templateUrl: './demo-color.component.html',
  styles: ``
})
export class DemoColorComponent {
  formControl = inject(FormBuilder).control({
    baseColor: toHex(new Color('hsl', [103, 45, 52])),
    stepDownL: 40,
    stepUpL: 12,
  })

  private injector = inject(Injector);
  private document = inject(DOCUMENT);
  colorShades = signal<Color[]>([]);

  constructor() {
    this.formControl.valueChanges.pipe(
      startWith(this.formControl.value),
    ).subscribe(v => {
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
          this.document.body.style.setProperty(`--color-primary-${ name }`, `${ Math.floor(c.r * 255) } ${ Math.floor(c.g * 255) } ${ Math.floor(c.b * 255) }`)
        })
      }, { injector: this.injector })
    })
  }
}
