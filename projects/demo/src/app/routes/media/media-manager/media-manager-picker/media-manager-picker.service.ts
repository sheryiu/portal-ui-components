import { Injectable, signal } from '@angular/core';
import { PuiOverlayRef } from 'portal-ui-ng/base';
import { ActionDrawerLayoutDataProvider } from 'portal-ui-ng/pages';
import { MediaManagerPickerComponent } from './media-manager-picker.component';

@Injectable()
export class MediaManagerPickerService implements ActionDrawerLayoutDataProvider {

  configuration = { content: MediaManagerPickerComponent };
  heading = signal<string>('Choose a file');

  private overlayRef!: PuiOverlayRef;

  onActionDrawerInit(overlayRef: PuiOverlayRef): void {
    this.overlayRef = overlayRef;
  }
}
