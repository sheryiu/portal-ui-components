import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, TemplateRef, Type, inject } from '@angular/core';
import { OVERLAY_CONFIG, OVERLAY_CONTENT, OVERLAY_DATA, PuiOverlayConfig } from './overlay';
import { OverlayContainerComponent } from './overlay-container/overlay-container.component';
import { PuiOverlayRef } from './pui-overlay-ref';

@Injectable({
  providedIn: 'root'
})
export class PuiOverlayService {

  private overlay = inject(Overlay);

  position = () => this.overlay.position();
  scrollStrategies = this.overlay.scrollStrategies;

  open<T, D>(
    component: Type<T> | TemplateRef<unknown>,
    config: PuiOverlayConfig<D>,
  ) {
    const overlayRef = this.overlay.create({
      ...config,
    });
    const overlayRefExtra = new PuiOverlayRef(overlayRef, config.ignorePointerEventsFrom);
    const injector = Injector.create({
      providers: [
        {
          provide: OVERLAY_DATA,
          useValue: config.data,
        },
        {
          provide: OVERLAY_CONTENT,
          useValue: component,
        },
        {
          provide: OVERLAY_CONFIG,
          useValue: config,
        },
        {
          provide: PuiOverlayRef,
          useValue: overlayRefExtra,
        },
      ],
      parent: config.parentInjector
    })
    const portal = new ComponentPortal(OverlayContainerComponent, config.viewContainerRef, injector);
    portal.attach(overlayRef);
    overlayRefExtra.afterOpened$.next();
    if (config.hasBackdrop && config.closeOnBackdropClick) {
      overlayRefExtra.closeOnBackdropClick();
    }
    if (config.closeOnEscapeKeydown) {
      overlayRefExtra.closeOnEscapeKeydown();
    }
    return overlayRefExtra;
  }
}
