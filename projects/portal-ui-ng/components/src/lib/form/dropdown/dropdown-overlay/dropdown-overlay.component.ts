import { inject, Signal } from '@angular/core';
import { DropdownComponent } from '../dropdown.component';

export abstract class DropdownOverlay {
  protected dropdown = inject(DropdownComponent, { host: true, skipSelf: true });
  abstract selectValue(value: unknown): void;
}

export type DropdownOverlayData<T> = {
  selectedValue: Signal<T | null>
}