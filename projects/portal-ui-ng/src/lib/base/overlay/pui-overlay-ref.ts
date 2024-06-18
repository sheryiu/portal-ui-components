import { OverlayRef } from '@angular/cdk/overlay';
import { ReplaySubject, concat, filter, take, takeUntil, tap, timer } from 'rxjs';

export class PuiOverlayRef {
  constructor(public overlayRef: OverlayRef, ignoreEventsFrom?: Element | Element[]) {
    const ignore = Array.isArray(ignoreEventsFrom) ? ignoreEventsFrom : [ignoreEventsFrom]
    concat(
      // the timer delay can be removed
      timer(100),
      overlayRef.outsidePointerEvents().pipe(
        ignoreEventsFrom ? filter(e => e.target instanceof Element && ignore.every(i => !i?.contains(e.target as Element))) : tap(),
        take(1)
      ),
    ).pipe(
      takeUntil(this.afterClosed$),
    ).subscribe((v) => {
      if (v instanceof MouseEvent) {
        // ignore clicks from cdk backdrop as the event is handled by closeOnBackdropClick()
        if (v.target instanceof Element && (v.target as Element).closest('.cdk-overlay-backdrop') != null) return;
        this.close();
      }
    })
  }
  close() {
    this._close$.next();
  }
  dispose() {
    this.overlayRef.dispose();
    this.afterClosed$.complete();
    this.afterOpened$.complete();
    this._close$.complete();
  }
  afterOpened$ = new ReplaySubject<void>(1);
  afterClosed$ = new ReplaySubject<void>(1);
  _close$ = new ReplaySubject<void>(1);
  closeOnBackdropClick() {
    this.overlayRef.backdropClick().pipe(
      take(1),
      takeUntil(this.afterClosed$),
    ).subscribe(() => {
      this.close();
    })
  }
}