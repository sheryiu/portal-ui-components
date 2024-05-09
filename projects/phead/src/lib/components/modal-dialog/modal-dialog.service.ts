import { Injectable, inject } from '@angular/core';
import { PheadOverlayService } from '../../base';
import { ModalDialogComponent, ModalDialogData } from './modal-dialog.component';

@Injectable()
export class ModalDialogService {

  private overlay = inject(PheadOverlayService);

  open() {
    this.overlay.open<ModalDialogComponent, ModalDialogData>(
      ModalDialogComponent,
      {
        positionStrategy: this.overlay.position().global()
          .centerHorizontally()
          .centerVertically(),
        scrollStrategy: this.overlay.scrollStrategies.block(),
        hasBackdrop: true,
        backdropClass: 'phead-modal-dialog-backdrop',
      }
    )
  }
}
