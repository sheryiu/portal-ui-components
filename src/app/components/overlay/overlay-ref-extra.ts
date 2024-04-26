import { OverlayRef } from '@angular/cdk/overlay';
import { ReplaySubject, concat, switchMap, take, takeUntil, timer } from 'rxjs';

export class OverlayRefExtra {
  constructor(public overlayRef: OverlayRef) {
    concat(
      timer(500),
      overlayRef.outsidePointerEvents().pipe(take(1)),
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