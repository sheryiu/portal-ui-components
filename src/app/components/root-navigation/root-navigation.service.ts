import { Injectable, InjectionToken, inject, makeEnvironmentProviders } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type RootTab = {
  id: string;
  title?: string;
  icon?: string;
  route?: any[];
}

export const ROOT_NAVIGATION_TABS = new InjectionToken<RootTab[]>('root navigation tabs');

@Injectable({
  providedIn: 'any'
})
export class RootNavigationService {

  private injectedTabs = inject(ROOT_NAVIGATION_TABS, { optional: true });

  private tabs = new BehaviorSubject<RootTab[]>(this.injectedTabs ?? []);
  tabs$ = this.tabs.asObservable();
}

export function provideRootNavigationTabs(tabs: RootTab[]) {
  return makeEnvironmentProviders([
    {
      provide: ROOT_NAVIGATION_TABS,
      useValue: tabs,
    }
  ])
}