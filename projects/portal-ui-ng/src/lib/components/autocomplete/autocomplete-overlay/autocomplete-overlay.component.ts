import { A11yModule } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, ElementRef, NgZone, TemplateRef, afterNextRender, effect, inject, viewChildren } from '@angular/core';
import { HoverableDirective, OVERLAY_DATA } from '../../../base';

export type AutocompleteOverlayData<D> = {
  templateRef: TemplateRef<{ $implicit: D; value: string; }>;
  items: D[];
  selectedValue: string | undefined | null;
  valueFn: (v: D) => string;
  onSelect: (value: D) => void;
}

@Component({
  selector: 'pui-autocomplete-overlay',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    A11yModule,
    HoverableDirective,
  ],
  templateUrl: './autocomplete-overlay.component.html',
})
export class AutocompleteOverlayComponent<D> {
  private zone = inject(NgZone);
  private destroyRef = inject(DestroyRef);
  protected data = inject(OVERLAY_DATA) as AutocompleteOverlayData<D>;
  private options = viewChildren<ElementRef<HTMLButtonElement>>('options');
  protected selectedOption?: HTMLButtonElement;

  protected items = this.data.items.map(item => [item, this.data.valueFn(item)] as const);

  constructor() {
    const keydown = (event: KeyboardEvent) => {
      // if ((event.target instanceof HTMLInputElement) || (event.target instanceof HTMLTextAreaElement) || (event.target instanceof HTMLElement && !!event.target.contentEditable)) return;
      this.zone.run(() => {
        if (event.key == 'ArrowDown') {
          this.nextOption();
        } else if (event.key == 'ArrowUp') {
          this.prevOption();
        } else if (event.key == 'Enter') {
          this.selectedOption?.click();
        }
      })
    }
    afterNextRender(() => {
      window.addEventListener('keydown', keydown)
    })
    this.destroyRef.onDestroy(() => window.removeEventListener('keydown', keydown))
    const ref = effect(() => {
      const i = this.items.findIndex(([_, v]) => v == this.data.selectedValue)
      this.selectedOption = this.options().at(i == -1 ? 0 : i)?.nativeElement;
    }, { manualCleanup: true })
    this.destroyRef.onDestroy(() => ref.destroy())
  }

  protected selectValue(value: D) {
    this.data.onSelect(value);
  }

  private prevOption() {
    if (!this.selectedOption) return;
    const at = this.options().findIndex(el => el.nativeElement === this.selectedOption);
    if (at - 1 >= 0) {
      this.selectedOption = this.options().at(at - 1)?.nativeElement;
      this.selectedOption?.scrollIntoView({ block: 'center' })
    }
  }

  private nextOption() {
    if (!this.selectedOption) return;
    const at = this.options().findIndex(el => el.nativeElement === this.selectedOption);
    if (at + 1 < this.options().length) {
      this.selectedOption = this.options().at(at + 1)?.nativeElement;
      this.selectedOption?.scrollIntoView({ block: 'center' })
    }
  }

}
