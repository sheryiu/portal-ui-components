import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { ColumnConfig, TableContentDataProvider } from 'portal-ui-ng';
import { InventoryShelfDataService } from '../../../data/inventory-shelf-data.service';
import { InventoryShelf } from '../../../data/inventory.types';

@Injectable()
export class InventoryShelfTableService implements TableContentDataProvider<InventoryShelf> {
  private dataService = inject(InventoryShelfDataService);

  configuration = {
    hasAddControl: false,
    hasRefreshControl: true,
    useVirtualScroll: true,
  };
  data: WritableSignal<InventoryShelf[]> = signal([]);
  columnsConfig: Signal<ColumnConfig[]> = signal<ColumnConfig[]>([
    {
      key: 'aisle',
      path: 'location.aisle',
      label: 'Aisle',
    },
    {
      key: 'row',
      path: 'location.row',
      label: 'Row',
    },
    {
      key: 'layer',
      path: 'location.layer',
      label: 'Layer',
    },
    {
      key: 'maxCapacity',
      label: 'Maximum Capacity (g)',
      jsonSchema: {
        type: 'number',
      }
    },
    {
      key: 'isAllowFragileItems',
      label: 'Allows Fragile',
      jsonSchema: {
        type: 'boolean',
      }
    },
  ]);
  columnsToDisplay: Signal<string[]> = signal([
    'aisle', 'row', 'layer', 'maxCapacity', 'isAllowFragileItems'
  ]);

  constructor() {
    this.dataService.getList().subscribe(data => {
      this.data.set(data)
    })
  }

  routeToDetail?(item: InventoryShelf): any[] {
    return ['../', 'detail', item.id]
  }
}
