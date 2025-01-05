import { Injectable, signal, Signal } from '@angular/core';
import { TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';

@Injectable()
export class InventoryItemListService implements VerticalLayoutDataProvider {

  heading: Signal<string> = signal('Inventory Items');
  tabs: Signal<TabConfig[]> = signal([]);
}
