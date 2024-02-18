import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector, TemplateRef, Type, ViewContainerRef, inject } from '@angular/core';
import { OverlayContainerComponent } from './overlay-container/overlay-container.component';
import { OverlayRefExtra } from './overlay-ref-extra';

export const OVERLAY_DATA = new InjectionToken('overlay data');
export const OVERLAY_CONTENT = new InjectionToken<Type<any> | TemplateRef<unknown>>('overlay component');

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  private overlay = inject(Overlay);

  position = () => this.overlay.position();
  scrollStrategies = this.overlay.scrollStrategies;

  open<T, D>(
    component: Type<T> | TemplateRef<unknown>,
    config: OverlayConfig & {
      parentInjector?: Injector | undefined,
      viewContainerRef?: ViewContainerRef | null | undefined,
      data?: D,
    }
  ) {
    const overlayRef = this.overlay.create({
      ...config,
    });
    const overlayRefExtra = new OverlayRefExtra(overlayRef);
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
          provide: OverlayRefExtra,
          useValue: overlayRefExtra,
        },
      ],
      parent: config.parentInjector
    })
    const portal = new ComponentPortal(OverlayContainerComponent, config.viewContainerRef, injector);
    portal.attach(overlayRef);
    overlayRefExtra.afterOpened$.next();
    return overlayRefExtra;
  }
}
