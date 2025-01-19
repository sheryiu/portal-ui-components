import { inject, Injectable } from '@angular/core';
import { PuiOverlayRef, PuiOverlayService } from 'portal-ui-ng/base';
import { ErrorOverlayData, ErrorOverlayDuration } from './error-overlay';
import { ErrorOverlayComponent } from './error-overlay/error-overlay.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorOverlayService {
  private overlay = inject(PuiOverlayService)
  private overlayRef?: PuiOverlayRef;

  /**
   *
   * @param message accepts HTML (binds to innerHTML of the error overlay)
   * @param duration
   * @returns
   */
  showError(message: string, config: {
    icon?: string,
    duration?: ErrorOverlayDuration,
  } = {
    icon: 'error',
    duration: ErrorOverlayDuration.LONG,
  }) {
    this.overlayRef?.close()
    const overlayRef = this.overlay.open<ErrorOverlayComponent, ErrorOverlayData>(
      ErrorOverlayComponent,
      {
        positionStrategy: this.overlay.position().global()
          .top('4rem')
          .centerHorizontally(),
        scrollStrategy: this.overlay.scrollStrategies.noop(),
        stayOpenedOnOutsideClicks: true,
        closeOnBackdropClick: false,
        hasBackdrop: false,
        data: {
          message: message,
          icon: config.icon ?? 'error',
          duration: config.duration ?? ErrorOverlayDuration.LONG,
        }
      }
    )
    this.overlayRef = overlayRef;
    return overlayRef;
  }
}
