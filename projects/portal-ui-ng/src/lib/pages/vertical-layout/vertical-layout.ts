import { InjectionToken, Signal, WritableSignal } from '@angular/core';
import { Params } from '@angular/router';

export type TabConfig = {
  label: string;
  route: any[];
}

export interface VerticalLayoutDataProvider {
  params?: WritableSignal<Params>;
  queryParams?: WritableSignal<Params>;
  heading: Signal<string>;
  tabs: Signal<TabConfig[]>;
}

export const VERTICAL_LAYOUT_DATA_PROVIDER = new InjectionToken<VerticalLayoutDataProvider>('vertical layout data provider')