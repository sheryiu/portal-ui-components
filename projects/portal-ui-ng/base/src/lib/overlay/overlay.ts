import { OverlayConfig } from '@angular/cdk/overlay';
import { InjectionToken, Injector, TemplateRef, Type, ViewContainerRef } from '@angular/core';

export type PuiOverlayConfig<D> = OverlayConfig & {
  /** backdrop transition doesn't change with this value, please manually modify it */
  // TODO add options to tune duration, distance etc..
  // TODO make backdrop gently disappear
  animation?: 'default' | 'slideInEnd' | null;
  parentInjector?: Injector | undefined;
  viewContainerRef?: ViewContainerRef | null | undefined;
  data?: D;
  closeOnBackdropClick?: boolean;
  ignorePointerEventsFrom?: Element | Element[];
  closeOnEscapeKeydown?: boolean;
}

export const OVERLAY_DATA = new InjectionToken('overlay data');
export const OVERLAY_CONFIG = new InjectionToken<PuiOverlayConfig<unknown>>('overlay config');
export const OVERLAY_CONTENT = new InjectionToken<Type<any> | TemplateRef<unknown>>('overlay component');
