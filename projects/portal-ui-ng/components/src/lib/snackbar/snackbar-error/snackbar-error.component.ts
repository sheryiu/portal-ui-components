import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Component, inject, NgZone, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule, OVERLAY_DATA, PuiOverlayRef } from 'portal-ui-ng/base';
import { first, switchMap, timer } from 'rxjs';
import { TooltipDirective } from '../../tooltip/tooltip.directive';
import { SnackbarDuration, SnackbarErrorData } from '../snackbar-data';

@Component({
  selector: 'pui-snackbar-error',
  imports: [
    ButtonModule,
    TooltipDirective
  ],
  templateUrl: './snackbar-error.component.html',
  styles: ``
})
export class SnackbarErrorComponent {
  private data = inject(OVERLAY_DATA) as SnackbarErrorData;
  private ref = inject(PuiOverlayRef)
  private applicationRef = inject(ApplicationRef)
  private zone = inject(NgZone)
  private document = inject(DOCUMENT)

  message = signal(typeof this.data.message == 'string' ? this.data.message : `${this.data.message.name}: ${this.data.message.message}`)
  icon = signal(this.data.icon)
  isTruncated = signal(true)

  constructor() {
    if (!(this.data.duration == SnackbarDuration.INFINITE || this.document.visibilityState == 'hidden')) {
      this.applicationRef.isStable.pipe(
        first(stable => stable),
        switchMap(() => timer(10_000)),
        takeUntilDestroyed()
      ).subscribe(() => {
        this.zone.run(() => {
          this.ref.close();
        })
      })
    }
  }

  onCloseClick() {
    this.ref.close();
  }

  toggleTruncated() {
    this.isTruncated.update(t => !t)
  }
}
