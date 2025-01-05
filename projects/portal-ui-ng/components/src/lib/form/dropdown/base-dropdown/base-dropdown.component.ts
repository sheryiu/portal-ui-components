import { Component, forwardRef, inject } from '@angular/core';
import { PuiOverlayRef } from 'portal-ui-ng/base';
import { DropdownOverlay } from '../dropdown-overlay/dropdown-overlay.component';
import { SearchDropdownComponent } from '../search-dropdown/search-dropdown.component';

@Component({
  selector: 'pui-base-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './base-dropdown.component.html',
  styles: ``,
  providers: [
    {
      provide: DropdownOverlay,
      useExisting: forwardRef(() => SearchDropdownComponent),
    }
  ]
})
export class BaseDropdownComponent extends DropdownOverlay {
  private overlayRef = inject(PuiOverlayRef);

  override selectValue(value: unknown): void {
    this.dropdown.selectValue(value);
    this.overlayRef.close();
  }
}
