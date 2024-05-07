import { InjectionToken, TemplateRef, Type, makeEnvironmentProviders } from '@angular/core';
import { PheadOverlayService } from './phead-overlay.service';

export const OVERLAY_DATA = new InjectionToken('overlay data');
export const OVERLAY_CONTENT = new InjectionToken<Type<any> | TemplateRef<unknown>>('overlay component');

export function providePheadOverlay() {
  return makeEnvironmentProviders([
    PheadOverlayService,
  ])
}