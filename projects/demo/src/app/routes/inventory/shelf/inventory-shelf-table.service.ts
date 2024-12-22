import { computed, effect, inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ColumnConfig, LayoutControlConfig, TableContentDataProvider } from 'portal-ui-ng';
import { InventoryShelfDataService } from '../../../data/inventory-shelf-data.service';
import { InventoryShelf } from '../../../data/inventory.types';

@Injectable()
export class InventoryShelfTableService implements TableContentDataProvider<InventoryShelf> {
  private dataService = inject(InventoryShelfDataService);
  private rawData = toSignal(this.dataService.getList())

  configuration = {
    useVirtualScroll: true,
  };
  data = signal<InventoryShelf[]>([]);
  columnsConfig = signal<ColumnConfig[]>([
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
  controlsConfig = signal<LayoutControlConfig[]>([
    {
      id: 'refresh',
      label: 'Refresh',
      icon: 'refresh',
      mode: 'low-emphasis'
    }
  ]);
  simpleFilterValue = signal<any>({})
  private sortFn = computed<(a: InventoryShelf, b: InventoryShelf) => number>(() => {
    const column = this.columnsConfig().find(config => config.isSortedAsc || config.isSortedDesc)
    if (!column) return () => 0;
    const isDesc = column.isSortedDesc ? -1 : 1;
    return (a, b) => {
      switch (column.key) {
        case 'aisle':
        case 'row':
        case 'layer':
          return ((a as any)['location'][column.key] > (b as any)['location'][column.key]) ? (isDesc) : ((a as any)['location'][column.key] < (b as any)['location'][column.key]) ? (-1 * isDesc) : 0;
        default: return ((a as any)[column.key] > (b as any)[column.key]) ? (isDesc) : ((a as any)[column.key] < (b as any)[column.key]) ? (-1 * isDesc) : 0;
      }
    }
  })
  private filterFn = computed<(item: InventoryShelf) => boolean>(() => {
    const filter = this.simpleFilterValue();
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

  onHeaderCellClick(columnKey: string, event: MouseEvent): void {
    this.columnsConfig.update(columns => {
      return columns.map(config => config.key == columnKey
        ? { ...config, isSortedAsc: (!config.isSortedAsc && !config.isSortedDesc) ? true : !!config.isSortedDesc, isSortedDesc: !!config.isSortedAsc }
        : { ...config, isSortedAsc: false, isSortedDesc: false }
      )
    })
  }
  routeToDetail?(item: InventoryShelf): any[] {
    return ['../', 'detail', item.id]
  }
}
