import { OverlayConfig } from '@angular/cdk/overlay';
import { Injectable, inject } from '@angular/core';
import { PuiOverlayService } from '../../base';
import { ModalDialogComponent, ModalDialogData } from './modal-dialog.component';

@Injectable()
export class ModalDialogService {

  private overlay = inject(PuiOverlayService);

  open<C>(dialogData: ModalDialogData<C>, overlayConfig?: Omit<OverlayConfig, 'data' | 'backdropClass'>) {
    const ref = this.overlay.open<ModalDialogComponent, ModalDialogData<C>>(
      ModalDialogComponent,
      {
        positionStrategy: this.overlay.position().global()
          .centerHorizontally()
          .centerVertically(),
        scrollStrategy: this.overlay.scrollStrategies.block(),
        hasBackdrop: true,
        backdropClass: 'pui-modal-dialog-backdrop',
        data: dialogData,
        closeOnBackdropClick: true,
        ...(overlayConfig ?? {}),
      }
    )
    return ref;
  }
}
