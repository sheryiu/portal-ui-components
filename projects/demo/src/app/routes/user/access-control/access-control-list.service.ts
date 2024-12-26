import { Injectable, signal } from '@angular/core';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng';

@Injectable()
export class AccessControlListService implements VerticalLayoutDataProvider {

  heading = signal<string>('Access Control Management');
  tabs = signal<TabConfig[]>([]);
}
