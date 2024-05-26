import { InjectionToken, Provider, Type, makeEnvironmentProviders } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalSearchService } from './global-search.service';

const GLOBAL_SEARCH_FEATURE = Symbol('global search feature')

export type GlobalSearchSuggestion = {
  /** supports HTML */
  title: string;
  /** supports HTML */
  description?: string;
  icon?: string;
  iconComponent?: Type<unknown>;
  category?: string;
  /** A number between 0 and 1, 0 means the search result shows higher */
  score: number;
  /**
   * @return falsy to prevent overlay from closing */
  onClick?: (suggestion: GlobalSearchSuggestion) => void | boolean | Promise<void | boolean>;
}

export interface GlobalSearchProvider {
  getSuggestions(searchTerm: Observable<string>): Observable<GlobalSearchSuggestion[]>;
}

type Feature = {
  readonly [GLOBAL_SEARCH_FEATURE]: any,
  provider: Provider,
}

export const GLOBAL_SEARCH_PROVIDERS = new InjectionToken<Type<GlobalSearchProvider>[]>('global search providers')
export const GLOBAL_SEARCH_PROVIDER_FNS = new InjectionToken<GlobalSearchProvider['getSuggestions'][]>('global search provider functions')
export function withProvider(
  provider: Type<GlobalSearchProvider>,
): Feature {
  return {
    [GLOBAL_SEARCH_FEATURE]: null,
    provider: {
      provide: GLOBAL_SEARCH_PROVIDERS,
      useValue: provider,
      multi: true,
    }
  }
}
export function withProviderFn(
  providerFn: GlobalSearchProvider['getSuggestions'],
): Feature {
  return {
    [GLOBAL_SEARCH_FEATURE]: null,
    provider: {
      provide: GLOBAL_SEARCH_PROVIDER_FNS,
      useValue: providerFn,
      multi: true,
    }
  }
}

type GlobalSearchOption = {
  hotkey?: string;
  width?: string;
  minWidth?: string;
  numberOfBestResults?: number;
}
export const GLOBAL_SEARCH_OPTION = new InjectionToken<GlobalSearchOption>('global search option');

export function provideGlobalSearch(
  option: GlobalSearchOption = {},
  ...features: Feature[]
) {
  return makeEnvironmentProviders([
    GlobalSearchService,
    {
      provide: GLOBAL_SEARCH_OPTION,
      useValue: option,
    },
    ...features.map(o => o.provider),
  ])
}