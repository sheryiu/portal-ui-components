import { makeEnvironmentProviders } from '@angular/core';
import { providePuiOverlay } from '../../base';
import { ModalDialogService } from './modal-dialog.service';

export function provideModalDialog() {
  return makeEnvironmentProviders([
    ModalDialogService,
    providePuiOverlay(),
  ])
}