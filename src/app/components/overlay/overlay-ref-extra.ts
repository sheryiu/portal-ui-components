import { OverlayRef } from '@angular/cdk/overlay';
import { ReplaySubject, concat, filter, take, takeUntil, tap, timer } from 'rxjs';

export class OverlayRefExtra {
  constructor(public overlayRef: OverlayRef, ignoreEventsFrom?: Element | Element[]) {
    const ignore = Array.isArray(ignoreEventsFrom) ? ignoreEventsFrom : [ignoreEventsFrom]
    concat(
      // the timer delay can be removed
      timer(100),
      overlayRef.outsidePointerEvents().pipe(
        ignoreEventsFrom ? filter(e => e.target instanceof Element && ignore.every(i => i != e.target)) : tap(),
        take(1)
      ),
    ).pipe(
      takeUntil(this.afterClosed$),
    ).subscribe((v) => {
      if (v instanceof MouseEvent) {
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