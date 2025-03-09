import { OverlayRef } from '@angular/cdk/overlay';
import { ReplaySubject, concat, filter, take, takeUntil, tap, timer } from 'rxjs';

export class PuiOverlayRef {
  constructor(public overlayRef: OverlayRef, stayOpenedOnOutsideClicks?: boolean, stayOpenedOnOutsideClicksContainedIn?: Element | Element[]) {
    if (stayOpenedOnOutsideClicks == true) return;
    const ignore = stayOpenedOnOutsideClicksContainedIn == null
      ? []
      : Array.isArray(stayOpenedOnOutsideClicksContainedIn)
      ? stayOpenedOnOutsideClicksContainedIn
      : [stayOpenedOnOutsideClicksContainedIn]
    concat(
      // TODO check if the timer delay can be removed
      timer(100),
      overlayRef.outsidePointerEvents().pipe(
        (ignore.length == 0) ? tap() : filter(e => e.target instanceof Element && !ignore.some(i => i.contains(e.target as Element))),
        take(1)
      ),
    ).pipe(
      takeUntil(this.afterClosed$),
    ).subscribe((v) => {
      if (v instanceof MouseEvent) {
        // ignore clicks from other overlays
        if (v.target instanceof Element && (v.target as Element).closest('.cdk-overlay-container') != null) return;
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
  /** @internal */
  _close$ = new ReplaySubject<void>(1);
  /** @internal */
  closeOnBackdropClick() {
    this.overlayRef.backdropClick().pipe(
      take(1),
      takeUntil(this.afterClosed$),
    ).subscribe(() => {
      this.close();
    })
  }
  /** @internal */
  closeOnEscapeKeydown() {
    this.overlayRef.keydownEvents().pipe(
      takeUntil(this.afterClosed$),
    ).subscribe(event => {
      // use this to check if event target is inside overlay
      // !this.overlayRef.overlayElement.contains(event.target as HTMLElement)
      if (event.type == 'keydown' && event.key == 'Escape'
        // TODO
        //  && [HTMLInputElement, HTMLTextAreaElement].every(type => !(event.target instanceof type)) && (event.target as HTMLElement).contentEditable !== 'true'
        ) {
        this.close();
      }
    })
  }
}