import { Component, inject } from '@angular/core';
import { OVERLAY_DATA, PuiOverlayRef } from 'portal-ui-ng/base';
import { DropdownOverlay, DropdownOverlayData } from '../dropdown-overlay.component';

@Component({
  selector: 'pui-base-dropdown-overlay',
  imports: [],
  templateUrl: './base-dropdown-overlay.component.html',
})
export class BaseDropdownOverlayComponent<T> extends DropdownOverlay {
  private overlayRef = inject(PuiOverlayRef);
  private overlayData = inject(OVERLAY_DATA) as DropdownOverlayData<T>;
  selectedValue = this.overlayData.selectedValue;

  override selectValue(value: unknown): void {
    this.dropdown.selectValue(value);
    this.overlayRef.close();
  }
}
