import { InjectionToken, TemplateRef, Type } from '@angular/core';

export const OVERLAY_DATA = new InjectionToken('overlay data');
export const OVERLAY_CONTENT = new InjectionToken<Type<any> | TemplateRef<unknown>>('overlay component');