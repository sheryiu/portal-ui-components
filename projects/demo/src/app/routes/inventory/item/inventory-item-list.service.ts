import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Params } from '@angular/router';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng';

@Injectable()
export class InventoryItemListService implements VerticalLayoutDataProvider {

  params: WritableSignal<Params> = signal({});
  heading: Signal<string> = signal('Inventory Items');
  tabs: Signal<TabConfig[]> = signal([]);
}
