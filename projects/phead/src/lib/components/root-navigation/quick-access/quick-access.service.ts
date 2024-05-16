import { PositionStrategy } from '@angular/cdk/overlay';
import { Injectable, inject, makeEnvironmentProviders } from '@angular/core';
import { PheadOverlayRef, PheadOverlayService } from '../../../base';
import { QuickAccessComponent } from './quick-access.component';

@Injectable()
export class QuickAccessService {
  private overlay = inject(PheadOverlayService);
  private quickAccessOverlayRef?: PheadOverlayRef;

  toggle(positionStrategy: PositionStrategy, targetElement?: Element) {
    if (this.quickAccessOverlayRef) {
      this.close();
    } else {
      this.open(positionStrategy, targetElement);
    }
  }

  close() {
    if (this.quickAccessOverlayRef) {
      this.quickAccessOverlayRef.close();
    }
  }

  open(positionStrategy: PositionStrategy, targetElement?: Element) {
    if (this.quickAccessOverlayRef) {
      return;
    }
    this.quickAccessOverlayRef = this.overlay.open(
      QuickAccessComponent,
      {
        positionStrategy,
        hasBackdrop: true,
        backdropClass: 'phead-quick-access-backdrop',
        ignorePointerEventsFrom: targetElement ? [targetElement] : undefined,
        height: '100vh',
      }
    )
    this.quickAccessOverlayRef.afterClosed$.subscribe(() => {
      this.quickAccessOverlayRef = undefined;
    })
  }
}

export function provideQuickAccess() {
  return makeEnvironmentProviders([
    QuickAccessService,
  ])
}