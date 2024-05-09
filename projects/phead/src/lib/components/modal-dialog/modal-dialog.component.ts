import { NgComponentOutlet } from '@angular/common';
import { Component, Type, inject } from '@angular/core';
import { HardSurfaceDirective, HoverableDirective, OVERLAY_DATA } from '../../base';

export type ModalDialogData = {
  icon?: string;
  iconComponent?: Type<unknown>;
  title: string;
  details?: string;
  detailsHtml?: string;
  detailsComponent?: Type<unknown>;
  actions?: {
    label: string;
  }[];
}

@Component({
  selector: 'phead-modal-dialog',
  standalone: true,
  imports: [
    NgComponentOutlet,
    HoverableDirective,
    HardSurfaceDirective,
  ],
  templateUrl: './modal-dialog.component.html',
  styles: ``
})
export class ModalDialogComponent {
  data = inject(OVERLAY_DATA) as ModalDialogData;

}
