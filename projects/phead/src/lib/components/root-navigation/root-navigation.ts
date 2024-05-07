import { InjectionToken, makeEnvironmentProviders, Provider, Type } from '@angular/core';

type RootTab = {
  icon?: string;
  label?: string;
  component?: Type<unknown> | (() => Promise<Type<unknown>>);
  routerLink: any[];
}

export type RootNavigationTabs = Array<RootTab>;

export const ROOT_NAVIGATION_TABS = new InjectionToken<RootNavigationTabs>('root navigation tabs');

export function provideRootNavigation(tabs: RootNavigationTabs, ...features: RootNavigationFeature[]) {
  return makeEnvironmentProviders([
    {
      provide: ROOT_NAVIGATION_TABS,
      useValue: tabs,
    },
    ...features.map(f => f.provider),
  ])
}

const FEATURE_SYMBOL = Symbol('root navigation')

type RootNavigationFeature = {
  readonly [FEATURE_SYMBOL]: any,
  provider: Provider,
};

export const ROOT_NAVIGATION_LOGO = new InjectionToken<{
  feature: 'logo';
  component: Type<unknown>;
}>('quick access components');
export function withLogo(type: Type<unknown>): RootNavigationFeature {
  return {
    [FEATURE_SYMBOL]: FEATURE_SYMBOL,
    provider: {
      provide: ROOT_NAVIGATION_LOGO,
      useValue: {
        feature: 'logo',
        component: type,
      },
    }
  };
}

// TODO: maybe rename this type
export type QuickAccessComponent = {
  feature: 'quickAccess';
  component: Type<unknown> | (() => Promise<Type<unknown>>);
}
export const QUICK_ACCESS_COMPONENTS = new InjectionToken<QuickAccessComponent[]>('quick access components');
export function withQuickAccessComponent(type: Type<unknown> | (() => Promise<Type<unknown>>)): RootNavigationFeature {
  return {
    [FEATURE_SYMBOL]: FEATURE_SYMBOL,
    provider: {
      provide: QUICK_ACCESS_COMPONENTS,
      useValue: {
        feature: 'quickAccess',
        component: type,
      } as QuickAccessComponent,
      multi: true,
    }
  }
}