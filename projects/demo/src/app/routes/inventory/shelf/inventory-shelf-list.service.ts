import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Params } from '@angular/router';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng';

@Injectable()
export class InventoryShelfListService implements VerticalLayoutDataProvider {

  params: WritableSignal<Params> = signal({});
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
