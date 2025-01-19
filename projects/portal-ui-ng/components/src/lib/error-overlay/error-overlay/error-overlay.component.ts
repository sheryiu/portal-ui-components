import { DOCUMENT } from '@angular/common';
import { ApplicationRef, Component, inject, NgZone, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule, OVERLAY_DATA, PuiOverlayRef } from 'portal-ui-ng/base';
import { first, switchMap, timer } from 'rxjs';
import { ErrorOverlayData, ErrorOverlayDuration } from '../error-overlay';

@Component({
  selector: 'pui-error-overlay',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './error-overlay.component.html',
  styles: ``
})
export class ErrorOverlayComponent {
  private data = inject(OVERLAY_DATA) as ErrorOverlayData;
  private ref = inject(PuiOverlayRef)
  private applicationRef = inject(ApplicationRef)
  private zone = inject(NgZone)
  private document = inject(DOCUMENT)

  message = signal(this.data.message)
  icon = signal(this.data.icon)

  constructor() {
    if (!(this.data.duration == ErrorOverlayDuration.INFINITE || this.document.visibilityState == 'hidden')) {
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
}
