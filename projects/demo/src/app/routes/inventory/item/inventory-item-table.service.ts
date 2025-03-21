import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ACTION_DRAWER_LAYOUT_DATA_PROVIDER, ActionDrawerOverlayService, ColumnConfig, computeSortFunction, EDITABLE_CONTENT_DATA_PROVIDER, TableContentDataProvider, updateSortedColumn } from 'portal-ui-ng/pages';
import { InventoryItemDataService } from '../../../data/inventory-item-data.service';
import { InventoryItem } from '../../../data/inventory.types';
import { InventoryItemAddService } from './inventory-item-add.service';

@Injectable()
export class InventoryItemTableService implements TableContentDataProvider<InventoryItem> {
  private dataService = inject(InventoryItemDataService);
  private actionDrawer = inject(ActionDrawerOverlayService);
  private rawData = toSignal(this.dataService.getList())

  configuration = {
    id: 'inventory-item-table',
    useVirtualScroll: true,
  };
  data = computed(() => (this.rawData() ?? [])
    .toSorted(this.sortFn())
  )
  columnsConfig = signal<ColumnConfig[]>([
    {
      key: 'belongsTo',
      label: 'Customer',
    },
    {
      key: 'netWeight',
      label: 'Net Weight (g)',
      fieldConfiguration: {
        type: 'number',
      }
    },
    {
      key: 'grossWeight',
      label: 'Gross Weight (g)',
      fieldConfiguration: {
        type: 'number',
      }
    },
    {
      key: 'isContainFragile',
      label: 'Fragile',
      fieldConfiguration: {
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
      isSortedDesc: true,
      fieldConfiguration: {
        type: 'date-time',
        format: 'yyyy-MM-dd HH:mm'
      }
    },
  ]);
  columnsToDisplay = signal({
    default: ['belongsTo', 'status'],
    768: ['belongsTo', 'netWeight', 'status', 'arrivedAt'],
    1280: ['belongsTo', 'netWeight', 'grossWeight', 'isContainFragile', 'status', 'arrivedAt']
  });
  filterValue = signal<any>({})
  private sortFn = computed<(a: InventoryItem, b: InventoryItem) => number>(() => {
    return computeSortFunction(this.columnsConfig())
  })

  routeToDetail?(item: InventoryItem): any[] {
    return ['detail', item.id]
  }
  onHeaderCellClick(columnKey: string, event: MouseEvent): void {
    this.columnsConfig.update(columns => updateSortedColumn(columns, columnKey))
  }
  onControlClick(key: string, event: MouseEvent): void {
    switch (key) {
      case 'add': {
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
        break;
      }
    }
  }
}
