import { Injectable, signal } from '@angular/core';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';

@Injectable()
export class MediaListService implements VerticalLayoutDataProvider {

  heading = signal('Media');
  tabs = signal<TabConfig[]>([
    {
      label: 'Files',
      route: ['file']
    },
    {
      label: 'Raw',
      route: ['raw']
    },
    {
      label: 'Local',
      route: ['local'],
      hidden: true
    },
  ]);
}
