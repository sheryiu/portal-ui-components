import { Injectable, inject } from '@angular/core';
import { PuiOverlayRef, PuiOverlayService } from 'portal-ui-ng/base';
import { SnackbarData, SnackbarDuration, SnackbarErrorData } from './snackbar-data';
import { SnackbarErrorComponent } from './snackbar-error/snackbar-error.component';
import { SnackbarOverlayComponent } from './snackbar-overlay/snackbar-overlay.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private overlay = inject(PuiOverlayService)
  private overlayRef?: PuiOverlayRef;

  open(message: string, config: {
    icon?: string,
    duration?: SnackbarDuration,
  } = {
    duration: SnackbarDuration.LONG,
  }) {
    this.overlayRef?.close()
    const overlayRef = this.overlay.open<SnackbarOverlayComponent, SnackbarData>(
      SnackbarOverlayComponent,
      {
        positionStrategy: this.overlay.position().global()
          .top('4rem')
          .centerHorizontally(),
        scrollStrategy: this.overlay.scrollStrategies.noop(),
        stayOpenedOnOutsideClicks: true,
        closeOnBackdropClick: false,
        closeOnEscapeKeydown: true,
        hasBackdrop: false,
        data: {
          message: message,
          icon: config.icon,
          duration: config.duration ?? SnackbarDuration.LONG,
        }
      }
    )
    this.overlayRef = overlayRef;
    return overlayRef;
  }

  openError(message: string | Error, config: {
    icon?: string,
    duration?: SnackbarDuration,
  } = {
    icon: 'error',
    duration: SnackbarDuration.LONG,
  }) {
    this.overlayRef?.close()
    const overlayRef = this.overlay.open<SnackbarErrorComponent, SnackbarErrorData>(
      SnackbarErrorComponent,
      {
        positionStrategy: this.overlay.position().global()
          .top('4rem')
          .centerHorizontally(),
        scrollStrategy: this.overlay.scrollStrategies.noop(),
        stayOpenedOnOutsideClicks: true,
        closeOnBackdropClick: false,
        closeOnEscapeKeydown: true,
        hasBackdrop: false,
        data: {
          message: message,
          icon: config.icon ?? 'error',
          duration: config.duration ?? SnackbarDuration.LONG,
        }
      }
    )
    this.overlayRef = overlayRef;
    return overlayRef;
  }
}
