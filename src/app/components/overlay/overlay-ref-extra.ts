import { OverlayRef } from '@angular/cdk/overlay';
import { ReplaySubject, take } from 'rxjs';

export class OverlayRefExtra {
  constructor(public overlayRef: OverlayRef) {
    overlayRef.outsidePointerEvents().pipe(
      take(1),
    ).subscribe(() => {
      this.close();
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
}