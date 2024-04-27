import { A11yModule } from '@angular/cdk/a11y';
import { AfterContentInit, AfterViewInit, Component, ElementRef, QueryList, TemplateRef, ViewChildren, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HotkeysService } from '@ngneat/hotkeys';
import { OVERLAY_DATA } from '../../../components/overlay/overlay';
import { SharedModule } from '../../../shared/shared.module';

export type AutocompleteOverlayData<D> = {
  templateRef: TemplateRef<unknown>;
  data: D[];
  onSelect: (value: D) => void;
}

@Component({
  selector: 'core-autocomplete-overlay',
  standalone: true,
  imports: [
    SharedModule,
    A11yModule,
  ],
  templateUrl: './autocomplete-overlay.component.html',
})
export class AutocompleteOverlayComponent<D> implements AfterViewInit {
  data = inject(OVERLAY_DATA) as AutocompleteOverlayData<D>;
  private hotkey = inject(HotkeysService);
  @ViewChildren('options') private options!: QueryList<ElementRef<HTMLButtonElement>>;
  selectedOption?: HTMLButtonElement;

  constructor() {
    this.hotkey.addShortcut({
      keys: 'down',
      allowIn: ['INPUT', 'TEXTAREA', 'CONTENTEDITABLE']
    }).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.nextOption();
    })
    this.hotkey.addShortcut({
      keys: 'up',
      allowIn: ['INPUT', 'TEXTAREA', 'CONTENTEDITABLE']
    }).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.prevOption();
    })
    this.hotkey.addShortcut({
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
