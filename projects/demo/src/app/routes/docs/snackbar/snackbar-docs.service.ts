import { Injectable, signal } from '@angular/core';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';

@Injectable()
export class SnackbarDocsService implements VerticalLayoutDataProvider {

  heading = signal<string>('Snackbar');
  tabs = signal<TabConfig[]>([
    {
      label: 'Demo',
      route: ['demo']
    }
  ]);
}
