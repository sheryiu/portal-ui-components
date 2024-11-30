import { InjectionToken, Signal, WritableSignal } from '@angular/core';
import { Params } from '@angular/router';
import { JsonSchema, ObjectJsonSchema } from '../editable-content/editable-content';

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
    hasRefreshControl?: boolean;
    hasAddControl?: boolean;
    hasAdvanceFilterControl?: boolean;
    useVirtualScroll?: boolean;
  };
  params?: WritableSignal<Params>;
  queryParams?: WritableSignal<Params>;
  data: Signal<T[]>;
  columnsConfig: Signal<ColumnConfig[]>;
  columnsToDisplay: Signal<string[]>;
  simpleFilterConfig?: Signal<ObjectJsonSchema>;
  currentSimpleFilter?: WritableSignal<any>;
  routeToDetail?(item: T): any[];
  headerCellClick?(columnKey: string, event: MouseEvent): void;
  filter?(): void;
  refresh?(): void;
  add?(): void;
}

export const TABLE_CONTENT_DATA_PROVIDER = new InjectionToken<TableContentDataProvider<any>>('table content data provider')