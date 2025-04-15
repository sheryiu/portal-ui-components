import { InjectionToken, Signal } from '@angular/core';
import { Params } from '@angular/router';
import { FieldConfiguration, ObjectFieldConfiguration } from '../field-configuration';
import { LayoutControlConfig } from '../layout/layout.service';

export type ColumnConfig = {
  label: string;
  key: string;
  /** @default path - equals to key */
  path?: string;
  isAlignCenter?: boolean;
  isAlignEnd?: boolean;
  isSortedAsc?: boolean;
  isSortedDesc?: boolean;
  fieldConfiguration?: FieldConfiguration;
}

export interface TableContentDataProvider<T> {
  readonly configuration?: {
    id?: string;
    useVirtualScroll?: boolean;
  };
  onParamsChange?(params: Params, queryParams: Params): void;
  onInit?(): void;
  onDestroy?(): void;
  // loading
  isLoading?: Signal<boolean>;
  // controls
  controlsConfig?: Signal<ReadonlyArray<LayoutControlConfig>>;
  onControlClick?(key: string, event: MouseEvent): void;
  // table
  data: Signal<T[]>;
  columnsConfig: Signal<ColumnConfig[]>;
  columnsToDisplay: Signal<Record<'default' | number, string[]> | string[]>;
  selectionMode?: Signal<null | 'single' | 'multi'>;
  selectedItems?: Signal<Set<T>>;
  routeToDetail?(item: T): any[];
  compareFn?(a: T, b: T): boolean;
  onTableRowClick?(item: T): void;
  onHeaderCellClick?(columnKey: string, event: MouseEvent): void;
  // filter
  filterConfig?: Signal<ObjectFieldConfiguration>;
  filterValue?: Signal<any>;
  onFilterChange?(value: any): void;
  // scroll
  onScrolledToTop?(): void;
  onScrolledToBottom?(): void;
}

export const TABLE_CONTENT_REFRESH_ONLY_CONTROLS: ReadonlyArray<LayoutControlConfig> = [
  {
    id: 'refresh',
    label: 'Refresh',
    icon: 'refresh',
    mode: 'low-emphasis'
  }
]
export const TABLE_CONTENT_DEFAULT_CONTROLS: ReadonlyArray<LayoutControlConfig> = [
  {
    id: 'refresh',
    label: 'Refresh',
    icon: 'refresh',
    mode: 'low-emphasis'
  },
  {
    id: 'add',
    label: 'Add new',
    icon: 'add'
  }
]
export const TABLE_CONTENT_DATA_PROVIDER = new InjectionToken<TableContentDataProvider<any>>('table content data provider')