import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ACTION_DRAWER_LAYOUT_DATA_PROVIDER, ActionDrawerOverlayService, ColumnConfig, EDITABLE_CONTENT_DATA_PROVIDER, TableContentDataProvider } from 'portal-ui-ng';
import { InventoryItemDataService } from '../../../data/inventory-item-data.service';
import { InventoryItem } from '../../../data/inventory.types';
import { InventoryItemAddService } from './inventory-item-add.service';

@Injectable()
export class InventoryItemTableService implements TableContentDataProvider<InventoryItem> {
  private dataService = inject(InventoryItemDataService);
  private actionDrawer = inject(ActionDrawerOverlayService);
  private rawData = toSignal(this.dataService.getList())

  configuration = {
    useVirtualScroll: true,
  };
  data = signal<InventoryItem[]>([]);
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
    const column = this.columnsConfig().find(config => config.isSortedAsc || config.isSortedDesc)
    if (!column) return () => 0;
    const isDesc = column.isSortedDesc ? -1 : 1;
    return (a, b) => {
      switch (column.key) {
        case 'arrivedAt': return (a.arrivedAt.getTime() - b.arrivedAt.getTime()) * isDesc;
        default: return ((a as any)[column.key] > (b as any)[column.key]) ? (isDesc) : ((a as any)[column.key] < (b as any)[column.key]) ? (-1 * isDesc) : 0;
      }
    }
  })
  private filterFn = computed<(item: InventoryItem) => boolean>(() => {
    const filter = this.filterValue();
    const hasFilter = Object.values(filter ?? {}).some(v => (typeof v == 'string') ? !!v : (v != null));
    return (item) => true
  })

  constructor() {
    effect(() => {
      const rawData = this.rawData()
      if (!rawData) return;
      this.data.set(rawData
        .filter(this.filterFn())
        .sort(this.sortFn())
      )
    }, { allowSignalWrites: true })
  }

  routeToDetail?(item: InventoryItem): any[] {
    return ['detail', item.id]
  }
  onHeaderCellClick(columnKey: string, event: MouseEvent): void {
    this.columnsConfig.update(columns => {
      return columns.map(config => config.key == columnKey
        ? { ...config, isSortedAsc: (!config.isSortedAsc && !config.isSortedDesc) ? true : !!config.isSortedDesc, isSortedDesc: !!config.isSortedAsc }
        : { ...config, isSortedAsc: false, isSortedDesc: false }
      )
    })
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
