import { InjectionToken, Provider } from '@angular/core';
import { OperatorFunction } from 'rxjs';

export const SEARCH_SUGGESTION = new InjectionToken<{
  name: string;
  source: SearchSuggestionSource;
}[]>('search input suggestion sources')

export type SearchSuggestion = {
  id: string;
}
export type SearchSuggestionSource = OperatorFunction<string | null | undefined, SearchSuggestion[] | null>;

export function provideSearchSuggestions(...sources: {
  name: string;
  source: SearchSuggestionSource;
}[]): Provider[] {
  return sources.map(source => ({
    provide: SEARCH_SUGGESTION,
    multi: true,
    useValue: source,
  }))
}