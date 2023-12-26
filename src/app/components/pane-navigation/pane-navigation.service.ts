import { Injectable, InjectionToken, inject, makeEnvironmentProviders } from '@angular/core';
import { nanoid } from 'nanoid';
import { BehaviorSubject } from 'rxjs';

type PaneTab = {
  id?: string;
  title?: string;
  icon?: string;
  route?: any[];
  type?: 'tab' | undefined;
} | {
  id?: string;
  type: 'header';
  title: string;
}

export type PaneTabs = PaneTab[];

export const PANE_NAVIGATION_TABS = new InjectionToken<PaneTab[]>('pane navigation tabs');

@Injectable({
  providedIn: 'any'
})
export class PaneNavigationService {

  private injectedTabs = inject(PANE_NAVIGATION_TABS, { optional: true });

  private tabs = new BehaviorSubject<(PaneTab & { id: string })[]>(this.injectedTabs?.map(tab => ({ id: nanoid(), ...tab })) ?? []);
  tabs$ = this.tabs.asObservable();
}

export function providePaneNavigationTabs(tabs: PaneTab[]) {
  return makeEnvironmentProviders([
    {
      provide: PANE_NAVIGATION_TABS,
      useValue: tabs,
    }
  ])
}