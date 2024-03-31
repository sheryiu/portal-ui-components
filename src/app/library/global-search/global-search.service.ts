import { Injectable, inject } from '@angular/core';
import { Observable, first } from 'rxjs';
import { GLOBAL_SEARCH_ACTIONS, GLOBAL_SEARCH_SUGGESTIONS, GlobalSearchAction, GlobalSearchSuggestion } from './global-search';

@Injectable()
export class GlobalSearchService {

  private _suggestionProviders = [] as Observable<GlobalSearchSuggestion[]>[];
  get suggestionProviders(): readonly Observable<GlobalSearchSuggestion[]>[] {
    return this._suggestionProviders;
  }

  private _actions = [] as GlobalSearchAction[];
  get actions(): readonly GlobalSearchAction[] {
    return this._actions;
  }

  constructor() {
    inject(GLOBAL_SEARCH_SUGGESTIONS, { optional: true })?.map(({ provider }) => {
      this.registerSuggestionProvider(provider())
    })
    inject(GLOBAL_SEARCH_ACTIONS, { optional: true })?.map(action => {
      this.registerAction(action)
    })
  }

  registerSuggestionProvider(provider: Observable<GlobalSearchSuggestion[] | undefined | null>) {
    this._suggestionProviders.push(
      provider.pipe(
        first((data): data is GlobalSearchSuggestion[] => data != null),
      )
    )
  }

  registerAction(action: GlobalSearchAction) {
    this._actions.push(action);
  }
}
