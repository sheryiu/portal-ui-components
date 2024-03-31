import { InjectionToken, Provider, makeEnvironmentProviders } from '@angular/core';
import { UrlCreationOptions } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalSearchService } from './global-search.service';

const GLOBAL_SEARCH_OPTION = Symbol('user dialog option')

export type GlobalSearchSuggestion = {
  title: string;
  description?: string;
  icon?: string;
  routerLink: any[];
  routerLinkOptions?: Omit<UrlCreationOptions, 'relativeTo'>;
}

export type GlobalSearchAction = {
  title: string;
  options?: {
    description?: string;
    icon?: string;
  }
  callback: () => void;
}

type Option = {
  readonly [GLOBAL_SEARCH_OPTION]: any,
  provider: Provider,
}

export const GLOBAL_SEARCH_SUGGESTIONS = new InjectionToken<{
  provider: () => Observable<GlobalSearchSuggestion[] | undefined | null>;
}[]>('global search suggestions')
export function withSuggestions(
  provider: () => Observable<GlobalSearchSuggestion[] | undefined | null>,
): Option {
  return {
    [GLOBAL_SEARCH_OPTION]: GLOBAL_SEARCH_OPTION,
    provider: {
      provide: GLOBAL_SEARCH_SUGGESTIONS,
      useValue: {
        provider,
      },
      multi: true,
    } as Provider
  }
}

export const GLOBAL_SEARCH_ACTIONS = new InjectionToken<GlobalSearchAction[]>('global search actions')
export function withAction(
  title: string,
  callback: () => void,
  options?: GlobalSearchAction['options'],
): Option {
  return {
    [GLOBAL_SEARCH_OPTION]: GLOBAL_SEARCH_OPTION,
    provider: {
      provide: GLOBAL_SEARCH_ACTIONS,
      useValue: {
        title,
        options,
        callback,
      },
      multi: true,
    } as Provider
  }
}

export function provideGlobalSearch(
  ...options: Option[]
) {
  return makeEnvironmentProviders([
    GlobalSearchService,
    ...options.map(o => o.provider),
  ])
}