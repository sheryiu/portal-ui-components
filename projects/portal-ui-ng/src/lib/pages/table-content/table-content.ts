import { InjectionToken, Signal, WritableSignal } from '@angular/core';
import { Params } from '@angular/router';
import { JsonSchema } from '../editable-content/editable-content';

export type ColumnConfig = {
  label: string;
  key: string;
  /** uses key for the default path */
  path?: string;
  isAlignEnd?: boolean;
  jsonSchema?: JsonSchema;
}

export interface TableContentDataProvider<T> {
  readonly configuration?: {
    hasRefreshControl?: boolean;
    hasAddControl?: boolean;
  };
  params?: WritableSignal<Params>;
  queryParams?: WritableSignal<Params>;
  data: Signal<T[]>;
  columnsConfig: Signal<ColumnConfig[]>;
  columnsToDisplay: Signal<Record<string | number, string[]> | string[]>;
  routeToDetail?(item: T): any[];
  refresh?(): void;
  add?(): void;
}

export const TABLE_CONTENT_DATA_PROVIDER = new InjectionToken<TableContentDataProvider<any>>('table content data provider')