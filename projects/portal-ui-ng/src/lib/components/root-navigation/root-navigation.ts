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

export const ROOT_NAVIGATION_LOGO = new InjectionToken<Type<unknown>>('root navigation logo');
export function withLogo(type: Type<unknown>): RootNavigationFeature {
  return {
    [FEATURE_SYMBOL]: FEATURE_SYMBOL,
    provider: {
      provide: ROOT_NAVIGATION_LOGO,
      useValue: type,
    }
  };
}

export const ROOT_NAVIGATION_USER = new InjectionToken<Type<unknown>>('root navigation user');
export function withUser(type: Type<unknown>): RootNavigationFeature {
  return {
    [FEATURE_SYMBOL]: FEATURE_SYMBOL,
    provider: {
      provide: ROOT_NAVIGATION_USER,
      useValue: type,
    }
  };
}