import { InjectionToken, Provider, Type, makeEnvironmentProviders } from '@angular/core';
import { GlobalSearchService } from './global-search.service';

const GLOBAL_SEARCH_OPTION = Symbol('user dialog option')

export const GLOBAL_SEARCH_SUGGESTIONS = new InjectionToken<{}[]>('global search suggestions')
export function withSuggestions(): {
  readonly [GLOBAL_SEARCH_OPTION]: any,
  provider: Provider,
} {
  return {
    [GLOBAL_SEARCH_OPTION]: GLOBAL_SEARCH_OPTION,
    provider: {
      provide: GLOBAL_SEARCH_SUGGESTIONS,
      useValue: [],
      multi: true,
    } as Provider
  }
}

export function provideGlobalSearch(
  ...options: {
    readonly [GLOBAL_SEARCH_OPTION]: unique symbol,
    provider: Provider,
  }[]
) {
  return makeEnvironmentProviders([
    GlobalSearchService,
    ...options.map(o => o.provider),
  ])
}