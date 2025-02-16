import { Injectable, signal } from '@angular/core';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';

@Injectable()
export class LoadingPanelDocsService implements VerticalLayoutDataProvider {

  heading = signal<string>('Loading Panel');
  tabs = signal<TabConfig[]>([
    {
      label: 'Demo',
      route: ['demo']
    }
  ]);
}
