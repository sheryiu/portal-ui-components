import { inject } from '@angular/core';
import { DropdownComponent } from '../dropdown.component';
export abstract class DropdownOverlay {
  protected dropdown = inject(DropdownComponent, { host: true, skipSelf: true });
  abstract selectValue(value: unknown): void;
}