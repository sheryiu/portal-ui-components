import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ColumnConfig, computeSortFunction, LayoutControlConfig, TableContentDataProvider } from 'portal-ui-ng';
import { InventoryShelfDataService } from '../../../data/inventory-shelf-data.service';
import { InventoryShelf } from '../../../data/inventory.types';

@Injectable()
export class InventoryShelfTableService implements TableContentDataProvider<InventoryShelf> {
  private dataService = inject(InventoryShelfDataService);
  private rawData = toSignal(this.dataService.getList())

  configuration = {
    useVirtualScroll: true,
  };
  data = computed(() => (this.rawData() ?? [])
    .toSorted(this.sortFn())
  )
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
      fieldConfiguration: {
        type: 'number',
      }
    },
    {
      key: 'isAllowFragileItems',
      label: 'Allows Fragile',
      fieldConfiguration: {
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
  private sortFn = computed<(a: InventoryShelf, b: InventoryShelf) => number>(() => {
    return computeSortFunction(this.columnsConfig())
  })

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
