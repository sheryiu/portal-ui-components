import { A11yModule } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, ElementRef, NgZone, TemplateRef, afterNextRender, computed, inject, signal, viewChildren } from '@angular/core';
import { ButtonModule, OVERLAY_DATA } from 'portal-ui-ng/base';

export type AutocompleteOverlayData<D> = {
  templateRef: TemplateRef<{ $implicit: D; value: string; }>;
  items: D[];
  selectedValue: string | undefined | null;
  valueFn: (v: D) => string;
  onSelect: (value: D) => void;
}

@Component({
  selector: 'pui-autocomplete-overlay',
  imports: [
    NgTemplateOutlet,
    A11yModule,
    ButtonModule,
  ],
  templateUrl: './autocomplete-overlay.component.html'
})
export class AutocompleteOverlayComponent<D> {
  private zone = inject(NgZone);
  private destroyRef = inject(DestroyRef);
  protected data = inject(OVERLAY_DATA) as AutocompleteOverlayData<D>;
  private options = viewChildren<ElementRef<HTMLButtonElement>>('options');

  protected items = this.data.items.map(item => [item, this.data.valueFn(item)] as const);
  private selectedIndex = signal(this.items.findIndex(([_, v]) => v == this.data.selectedValue))
  protected selectedOption = computed(() => {
    const i = this.selectedIndex();
    return this.options().at(i == -1 ? 0 : i)?.nativeElement;
  });


  constructor() {
    const keydown = (event: KeyboardEvent) => {
      this.zone.run(() => {
        if (event.key == 'ArrowDown') {
          this.nextOption();
        } else if (event.key == 'ArrowUp') {
          this.prevOption();
        } else if (event.key == 'Enter') {
          this.selectedOption()?.click();
        }
      })
    }
    afterNextRender(() => {
      window.addEventListener('keydown', keydown)
    })
    this.destroyRef.onDestroy(() => window.removeEventListener('keydown', keydown))
  }

  protected selectValue(value: D) {
    this.data.onSelect(value);
  }

  private prevOption() {
    if (!this.selectedOption()) return;
    const at = this.options().findIndex(el => el.nativeElement === this.selectedOption());
    if (at - 1 >= 0) {
      this.selectedIndex.set(at - 1);
      this.selectedOption()?.scrollIntoView({ block: 'center' })
    }
  }

  private nextOption() {
    if (!this.selectedOption()) return;
    const at = this.options().findIndex(el => el.nativeElement === this.selectedOption());
    if (at + 1 < this.options().length) {
      this.selectedIndex.set(at + 1);
      this.selectedOption()?.scrollIntoView({ block: 'center' })
    }
  }

}
