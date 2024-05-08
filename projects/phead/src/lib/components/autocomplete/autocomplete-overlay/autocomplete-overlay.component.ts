import { A11yModule } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, Component, ElementRef, QueryList, TemplateRef, ViewChildren, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HotkeysService } from '@ngneat/hotkeys';
import { HoverableDirective, OVERLAY_DATA } from '../../../base';

export type AutocompleteOverlayData<D> = {
  templateRef: TemplateRef<unknown>;
  data: D[];
  onSelect: (value: D) => void;
}

@Component({
  selector: 'phead-autocomplete-overlay',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    A11yModule,
    HoverableDirective,
  ],
  templateUrl: './autocomplete-overlay.component.html',
})
export class AutocompleteOverlayComponent<D> implements AfterViewInit {
  data = inject(OVERLAY_DATA) as AutocompleteOverlayData<D>;
  private hotkey = inject(HotkeysService, { optional: true });
  @ViewChildren('options') private options!: QueryList<ElementRef<HTMLButtonElement>>;
  selectedOption?: HTMLButtonElement;

  constructor() {
    this.hotkey?.addShortcut({
      keys: 'down',
      allowIn: ['INPUT', 'TEXTAREA', 'CONTENTEDITABLE']
    }).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.nextOption();
    })
    this.hotkey?.addShortcut({
      keys: 'up',
      allowIn: ['INPUT', 'TEXTAREA', 'CONTENTEDITABLE']
    }).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.prevOption();
    })
    this.hotkey?.addShortcut({
      keys: 'enter',
      allowIn: ['INPUT', 'TEXTAREA', 'CONTENTEDITABLE']
    }).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.selectedOption?.click();
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.selectedOption = this.options.first.nativeElement;
    })
  }

  selectValue(value: D) {
    this.data.onSelect(value);
  }

  private prevOption() {
    if (!this.selectedOption) return;
    const at = this.options.toArray().findIndex(el => el.nativeElement === this.selectedOption);
    if (at - 1 >= 0) {
      this.selectedOption = this.options.get(at - 1)?.nativeElement;
    }
  }

  private nextOption() {
    if (!this.selectedOption) return;
    const at = this.options.toArray().findIndex(el => el.nativeElement === this.selectedOption);
    if (at + 1 < this.options.length) {
      this.selectedOption = this.options.get(at + 1)?.nativeElement;
    }
  }

}
