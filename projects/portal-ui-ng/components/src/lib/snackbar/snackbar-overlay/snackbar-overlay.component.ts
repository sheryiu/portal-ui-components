
import { ApplicationRef, Component, inject, NgZone, signal, DOCUMENT } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule, HoverableDirective, OVERLAY_DATA, PuiOverlayRef } from 'portal-ui-ng/base';
import { first, switchMap, timer } from 'rxjs';
import { TooltipDirective } from '../../tooltip/tooltip.directive';
import { SnackbarData, SnackbarDuration } from '../snackbar-data';

@Component({
  selector: 'pui-snackbar-overlay',
  imports: [
    ButtonModule,
    HoverableDirective,
    TooltipDirective
  ],
  templateUrl: './snackbar-overlay.component.html',
  styles: ``
})
export class SnackbarOverlayComponent {
  private data = inject(OVERLAY_DATA) as SnackbarData;
  private ref = inject(PuiOverlayRef)
  private applicationRef = inject(ApplicationRef)
  private zone = inject(NgZone)
  private document = inject(DOCUMENT)

  message = signal(this.data.message)
  icon = signal(this.data.icon)
  isTruncated = signal(true)

  protected hasInteracted = signal(false)

  constructor() {
    if (!(this.data.duration == SnackbarDuration.INFINITE || this.document.visibilityState == 'hidden')) {
      this.applicationRef.isStable.pipe(
        first(stable => stable),
        switchMap(() => timer(10_000)),
        takeUntilDestroyed()
      ).subscribe(() => {
        if (this.hasInteracted()) return;
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
