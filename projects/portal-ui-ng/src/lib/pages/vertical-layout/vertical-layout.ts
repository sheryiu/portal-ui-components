import { InjectionToken, Signal } from '@angular/core';
import { Params } from '@angular/router';

export type TabConfig = {
  label: string;
  route: any[];
}

export interface VerticalLayoutDataProvider {
  onParamsChange?(params: Params, queryParams: Params): void;
  heading: Signal<string>;
  tabs: Signal<TabConfig[]>;
}

export const VERTICAL_LAYOUT_DATA_PROVIDER = new InjectionToken<VerticalLayoutDataProvider>('vertical layout data provider')