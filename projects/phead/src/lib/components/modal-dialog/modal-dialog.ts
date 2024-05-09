import { makeEnvironmentProviders } from '@angular/core';
import { providePheadOverlay } from '../../base';
import { ModalDialogService } from './modal-dialog.service';

export function provideModalDialog() {
  return makeEnvironmentProviders([
    ModalDialogService,
    providePheadOverlay(),
  ])
}