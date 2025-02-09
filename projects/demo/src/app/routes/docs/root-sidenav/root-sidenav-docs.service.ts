import { Injectable, signal } from '@angular/core';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';

@Injectable()
export class RootSidenavDocsService implements VerticalLayoutDataProvider {

  heading = signal<string>('Root Sidenav');
  tabs = signal<TabConfig[]>([
    {
      label: 'Code',
      route: ['code']
    }
  ]);
}
