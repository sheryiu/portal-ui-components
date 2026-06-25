import { Injectable, inject } from '@angular/core';
import { PuiOverlayConfig, PuiOverlayService } from 'portal-ui-ng/base';
import { ModalDialogComponent, ModalDialogData } from './modal-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogService {

  private overlay = inject(PuiOverlayService);

  open<C, D>(dialogData: ModalDialogData<C>, overlayConfig?: Omit<PuiOverlayConfig<D>, 'data' | 'backdropClass'>) {
    const ref = this.overlay.open<ModalDialogComponent, ModalDialogData<C>>(
      ModalDialogComponent,
      Object.assign({
        positionStrategy: this.overlay.position().global()
          .centerHorizontally()
          .centerVertically(),
        scrollStrategy: this.overlay.scrollStrategies.block(),
        hasBackdrop: true,
        backdropClass: 'pui-modal-dialog-backdrop',
        data: dialogData,
        closeOnBackdropClick: true,
        animateEnter: 'pui-overlay__enter',
        animateLeave: 'pui-overlay__leave',
        leaveAnimationName: 'overlayLeave',
      }, overlayConfig) as PuiOverlayConfig<ModalDialogData<C>>
    )
    return ref;
  }
}
