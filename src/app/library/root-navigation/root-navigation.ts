import { InjectionToken, makeEnvironmentProviders } from '@angular/core';

type RootChildTab = {
  type: 'route';
  icon?: string;
  label: string;
  routerLink: any[];
} | {
  type: 'divider';
}

type RootTab = {
  icon: string;
  label?: string;
  routerLink: any[];
  children?: Array<RootChildTab>;
}

export type RootNavigationTabs = Array<RootTab>;

export const ROOT_NAVIGATION_TABS = new InjectionToken<RootNavigationTabs>('root navigation tabs');

export function provideRootNavigation(tabs: RootNavigationTabs) {
  return makeEnvironmentProviders([
    {
      provide: ROOT_NAVIGATION_TABS,
      useValue: tabs,
    }
  ])
}