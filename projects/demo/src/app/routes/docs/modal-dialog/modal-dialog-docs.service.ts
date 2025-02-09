import { Injectable, signal } from '@angular/core';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';

@Injectable()
export class ModalDialogDocsService implements VerticalLayoutDataProvider {

  heading = signal<string>('Modals and Dialogs');
  tabs = signal<TabConfig[]>([
    {
      label: 'Demo',
      route: ['demo'],
    },
  ]);
}
