import { InjectionToken, Signal, Type } from '@angular/core';
import { PuiOverlayRef } from '../../base';
export * from './action-drawer-layout.component';

export interface ActionDrawerLayoutDataProvider {
  readonly configuration: {
    content: Type<unknown>;
  };
  heading: Signal<string>;
  onActionDrawerInit?(overlayRef: PuiOverlayRef): void;
}

export const ACTION_DRAWER_LAYOUT_DATA_PROVIDER = new InjectionToken<ActionDrawerLayoutDataProvider>('action drawer layout data provider')