import { InjectionToken, TemplateRef, Type, makeEnvironmentProviders } from '@angular/core';
import { PuiOverlayService } from './pui-overlay.service';

export const OVERLAY_DATA = new InjectionToken('overlay data');
export const OVERLAY_CONTENT = new InjectionToken<Type<any> | TemplateRef<unknown>>('overlay component');

export function providePuiOverlay() {
  return makeEnvironmentProviders([
    PuiOverlayService,
  ])
}