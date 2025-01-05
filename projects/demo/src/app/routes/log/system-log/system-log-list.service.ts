import { Injectable, signal } from '@angular/core';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';

@Injectable()
export class SystemLogListService implements VerticalLayoutDataProvider {

  heading = signal('SystemLog');
  tabs = signal<TabConfig[]>([
    {
      label: 'Raw',
      route: ['raw']
    }
  ]);
}
