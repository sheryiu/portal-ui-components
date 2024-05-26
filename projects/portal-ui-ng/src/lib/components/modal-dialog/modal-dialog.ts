import { makeEnvironmentProviders } from '@angular/core';
import { providepuiOverlay } from '../../base';
import { ModalDialogService } from './modal-dialog.service';

export function provideModalDialog() {
  return makeEnvironmentProviders([
    ModalDialogService,
    providepuiOverlay(),
  ])
}