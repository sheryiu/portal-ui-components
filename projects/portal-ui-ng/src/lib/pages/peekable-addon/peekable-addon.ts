import { InjectionToken, Signal } from '@angular/core';
import { Params } from '@angular/router';

export interface PeekableAddonDataProvider {
  onParamsChange?(params: Params, queryParams: Params): void;
  /** provide a null or undefined value to remove the button */
  routeToFullContent: Signal<any[] | null | undefined>;
}

export const PEEKABLE_ADDON_DATA_PROVIDER = new InjectionToken<PeekableAddonDataProvider>('peekable addon data provider')