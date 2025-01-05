import { Injectable, signal, Signal } from '@angular/core';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';

@Injectable()
export class InventoryShelfListService implements VerticalLayoutDataProvider {

  heading: Signal<string> = signal('Warehouse Shelves');
  tabs: Signal<TabConfig[]> = signal<TabConfig[]>([
    {
      label: 'Map',
      route: ['map']
    },
    {
      label: 'Data',
      route: ['data']
    }
  ]);
}
