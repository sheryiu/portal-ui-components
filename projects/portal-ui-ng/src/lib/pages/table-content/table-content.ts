import { InjectionToken, Signal, WritableSignal } from '@angular/core';
import { Params } from '@angular/router';
import { JsonSchema, ObjectJsonSchema } from '../editable-content/editable-content';
import { LayoutControlConfig } from '../layout/layout.service';

export type ColumnConfig = {
  label: string;
  key: string;
  /** uses key for the default path */
  path?: string;
  isAlignEnd?: boolean;
  isSortedAsc?: boolean;
  isSortedDesc?: boolean;
  jsonSchema?: JsonSchema;
}

export interface TableContentDataProvider<T> {
  readonly configuration?: {
    useVirtualScroll?: boolean;
  };
  params?: WritableSignal<Params>;
  queryParams?: WritableSignal<Params>;
  // controls
  controlsConfig?: Signal<LayoutControlConfig[]>;
  onControlClick?(key: string, event: MouseEvent): void;
  // table
  data: Signal<T[]>;
  columnsConfig: Signal<ColumnConfig[]>;
  columnsToDisplay: Signal<Record<'default' | `${number}px` | number, string[]> | string[]>;
  selectionMode?: Signal<null | 'single' | 'multi'>;
  selectedItems?: WritableSignal<Set<T>>;
  routeToDetail?(item: T): any[];
  compareFn?(a: T, b: T): boolean;
  onTableRowClick?(item: T): void;
  onHeaderCellClick?(columnKey: string, event: MouseEvent): void;
  // filter
  simpleFilterConfig?: Signal<ObjectJsonSchema>;
  simpleFilterValue?: Signal<any>;
  onUpdateSimpleFilter?(value: any): void;
}

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