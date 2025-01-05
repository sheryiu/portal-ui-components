import { computed, inject, Injectable, signal } from '@angular/core';
import { ScreenWidthDetectorService } from 'portal-ui-ng';
import { ColumnConfig, computeFilterFunction, computeSortFunction, ObjectFieldConfiguration, TABLE_CONTENT_DEFAULT_CONTROLS, TableContentDataProvider, updateSortedColumn } from 'portal-ui-ng/pages';

@Injectable()
export class SystemLogTableService implements TableContentDataProvider<SystemLog> {
  private screenWidth = inject(ScreenWidthDetectorService);
  private rawData = signal<SystemLog[]>([
    // TODO supply with data
  ]);

  configuration = {
    useVirtualScroll: true,
  };
  data = computed(() => {
    const rawData = this.rawData();
    return rawData
      .toSorted(this.sortFn())
      .filter(this.filterFn());
  });
  columnsConfig = signal<ColumnConfig[]>([
    // TODO columns configuration
  ]);
  columnsToDisplay = signal<string[] | Record<number | 'default' | `${ number }px`, string[]>>(
    // TODO keys of columns to display
  );
  controlsConfig = signal(TABLE_CONTENT_DEFAULT_CONTROLS);
  filterConfig = signal<ObjectFieldConfiguration>({
    type: 'object',
    properties: {
      // TODO filter fields configuration
    }
  })
  filterValue = signal<{
    // TODO filter value type
  }>({})

  private sortFn = computed<(a: SystemLog, b: SystemLog) => number>(() => {
    return computeSortFunction(this.columnsConfig())
  })
  private filterFn = computed<(item: SystemLog) => boolean>(() => {
    return computeFilterFunction(this.filterValue(), {
      // TODO filter matching methods
    })
  })

  routeToDetail(item: SystemLog): any[] {
    if (this.screenWidth.above().sm()) {
      return ['../', 'system-log', { outlets: { peek: [item.id] } }]
    }
    return ['../', 'system-log', 'detail', item.id]
  }
  onHeaderCellClick(columnKey: string, event: MouseEvent): void {
    this.columnsConfig.update(columns => updateSortedColumn(columns, columnKey))
  }
  onFilterChange(value: any): void {
    this.filterValue.set(value)
  }
  onControlClick(key: string, event: MouseEvent): void {
    switch (key) {
      case 'add': {
        // TODO on add click
        break;
      }
      case 'refresh': {
        // TODO on refresh click
        break;
      }
    }
  }
}
