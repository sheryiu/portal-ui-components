import { inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { ACTION_DRAWER_LAYOUT_DATA_PROVIDER, ActionDrawerOverlayService, ColumnConfig, EDITABLE_CONTENT_DATA_PROVIDER, TableContentDataProvider } from 'portal-ui-ng';
import { InventoryItemDataService } from '../../data/inventory-item-data.service';
import { InventoryItem } from '../../data/inventory.types';
import { InventoryItemAddService } from './inventory-item-add.service';

@Injectable()
export class InventoryItemTableService implements TableContentDataProvider<InventoryItem> {
  private dataService = inject(InventoryItemDataService);
  private actionDrawer = inject(ActionDrawerOverlayService);

  configuration = {
    hasAddControl: true,
    hasRefreshControl: true,
    useVirtualScroll: true,
  };
  data: WritableSignal<InventoryItem[]> = signal([]);
  columnsConfig: Signal<ColumnConfig[]> = signal<ColumnConfig[]>([
    {
      key: 'belongsTo',
      label: 'Customer',
    },
    {
      key: 'netWeight',
      label: 'Net Weight (g)',
      jsonSchema: {
        type: 'number',
      }
    },
    {
      key: 'grossWeight',
      label: 'Gross Weight (g)',
      jsonSchema: {
        type: 'number',
      }
    },
    {
      key: 'isContainFragile',
      label: 'Fragile',
      jsonSchema: {
        type: 'boolean',
      }
    },
    {
      key: 'status',
      label: 'Status',
    },
    {
      key: 'arrivedAt',
      label: 'Arrived',
      isAlignEnd: true,
      jsonSchema: {
        type: 'date-time',
        format: 'yyyy-MM-dd HH:mm'
      }
    },
  ]);
  columnsToDisplay: Signal<string[]> = signal([
    'belongsTo', 'netWeight', 'grossWeight', 'isContainFragile', 'status', 'arrivedAt'
  ]);

  constructor() {
    this.dataService.getList().subscribe(data => {
      this.data.set(data)
    })
  }

  routeToDetail?(item: InventoryItem): any[] {
    return ['detail', item.id]
  }
  add(): void {
    this.actionDrawer.open(
      InventoryItemAddService,
      {
        providers: [
          {
            provide: EDITABLE_CONTENT_DATA_PROVIDER,
            useExisting: ACTION_DRAWER_LAYOUT_DATA_PROVIDER,
          }
        ]
      }
    )
  }
}
