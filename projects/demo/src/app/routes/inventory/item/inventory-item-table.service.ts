import { computed, effect, inject, Injectable, signal, Signal, WritableSignal } from '@angular/core';
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
    hasAddControl: true,
    hasRefreshControl: true,
    useVirtualScroll: true,
  };
  data: WritableSignal<InventoryItem[]> = signal([]);
  columnsConfig = signal<ColumnConfig[]>([
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
      isSortedDesc: true,
      jsonSchema: {
        type: 'date-time',
        format: 'yyyy-MM-dd HH:mm'
      }
    },
  ]);
  columnsToDisplay: Signal<string[]> = signal([
    'belongsTo', 'netWeight', 'grossWeight', 'isContainFragile', 'status', 'arrivedAt'
  ]);
  currentSimpleFilter = signal<any>({})
  private sortFn = computed<(a: InventoryItem, b: InventoryItem) => number>(() => {
    const column = this.columnsConfig().find(config => config.isSortedAsc || config.isSortedDesc)
    if (!column) return () => 0;
    const isDesc = column.isSortedDesc
      ? -1
      : 1;
    return (a, b) => {
      switch (column.key) {
        case 'arrivedAt': return (a.arrivedAt.getTime() - b.arrivedAt.getTime()) * isDesc;
        default: return ((a as any)[column.key] > (b as any)[column.key]) ? (isDesc) : ((a as any)[column.key] < (b as any)[column.key]) ? (-1 * isDesc) : 0;
      }
    }
  })

  constructor() {
    effect(() => {
      const filter = this.currentSimpleFilter()
      const rawData = this.rawData()
      if (!rawData) return;
      const hasFilter = Object.values(filter ?? {}).some(v => !!v);
      this.data.set(
        (hasFilter
          ? rawData.filter(item => {
            return true;
          })
          : rawData)
          .toSorted(this.sortFn())
      )
    }, { allowSignalWrites: true })
  }

  headerCellClick(columnKey: string, event: MouseEvent): void {
    this.columnsConfig.update(columns => {
      return columns.map(config => config.key == columnKey
        ? { ...config, isSortedAsc: (!config.isSortedAsc && !config.isSortedDesc) ? true : !!config.isSortedDesc, isSortedDesc: !!config.isSortedAsc }
        : { ...config, isSortedAsc: false, isSortedDesc: false }
      )
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
