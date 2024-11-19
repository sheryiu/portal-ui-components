import { InjectionToken, Signal, WritableSignal } from '@angular/core';
import { Params } from '@angular/router';
import { LiteralUnion } from '../../base';

// TODO actually not json schema, rename later
export type JsonSchema = ObjectJsonSchema | NumberJsonSchema | BooleanJsonSchema | StringJsonSchema | ArrayJsonSchema | DateTimeJsonSchema;

export type ObjectJsonSchema = {
  type: 'object';
  description?: string;
  properties: Record<string, JsonSchema>;
}

export type NumberJsonSchema = {
  type: 'number';
  description?: string;
  enum?: number[];
}

export type BooleanJsonSchema = {
  type: 'boolean';
  description?: string;
}

export type StringJsonSchema = {
  type: 'string';
  description?: string;
  // pattern?: string;
  enum?: string[];
}

export type ArrayJsonSchema = {
  type: 'array';
  description?: string;
  items: JsonSchema;
}

export type DateTimeJsonSchema = {
  type: 'date-time';
  description?: string;
  format?: LiteralUnion<'timeAgo', string>;
}

export interface EditableContentDataProvider<T> {
  readonly configuration?: {
    hasRefreshControl?: boolean;
  };
  params?: WritableSignal<Params>;
  queryParams?: WritableSignal<Params>;
  data: Signal<T | null | undefined>;
  jsonSchema: Signal<ObjectJsonSchema>;
  state: WritableSignal<{
    isDisabled?: boolean;
    isDirty?: boolean;
  }>;
  currentState: WritableSignal<{
    isValid?: boolean;
    isDisabled?: boolean;
    isDirty?: boolean;
  }>;
  refresh?(): void;
  cancel(): void;
  save(value: T): void;
}

export const EDITABLE_CONTENT_DATA_PROVIDER = new InjectionToken<EditableContentDataProvider<any>>('editable content data provider')