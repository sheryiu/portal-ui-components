import { InjectionToken, Signal, WritableSignal } from '@angular/core';
import { Params } from '@angular/router';

export interface PeekableAddonDataProvider {
  params?: WritableSignal<Params>;
  queryParams?: WritableSignal<Params>;
  /** provide a null or undefined value to remove the button */
  routeToFullContent: Signal<any[] | null | undefined>;
}

export const PEEKABLE_ADDON_DATA_PROVIDER = new InjectionToken<PeekableAddonDataProvider>('peekable addon data provider')