import { InjectionToken, Signal, WritableSignal } from '@angular/core';
import { Params } from '@angular/router';
import { LiteralUnion } from '../../base';
import { LayoutControlConfig } from '../layout/layout.service';

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
  params?: WritableSignal<Params>;
  queryParams?: WritableSignal<Params>;
  // data
  data: Signal<T | null | undefined>;
  jsonSchema: Signal<ObjectJsonSchema>;
  registerUpdateState?(fn: (state: { isDisabled?: boolean; isDirty?: boolean }) => void): void;
  onStateChange?(state: {
    isValid?: boolean;
    isDisabled?: boolean;
    isDirty?: boolean;
  }): void;
  onValueChange?(value: T): void;
  // controls
  controlsConfig?: Signal<ReadonlyArray<LayoutControlConfig>>;
  onControlClick?(key: string, event: MouseEvent): void;
}

export const EDITABLE_CONTENT_DEFAULT_CONTROLS: ReadonlyArray<LayoutControlConfig> = [
  {
    id: 'refresh',
    label: 'Refresh',
    icon: 'refresh',
    mode: 'low-emphasis'
  }
]
export const EDITABLE_CONTENT_DIRTY_CONTROLS: ReadonlyArray<LayoutControlConfig> = [
  {
    id: 'cancel',
    label: 'Cancel',
    icon: 'close',
    mode: 'low-emphasis'
  },
  {
    id: 'save',
    label: 'Save',
    icon: 'save'
  }
]
export const EDITABLE_CONTENT_DATA_PROVIDER = new InjectionToken<EditableContentDataProvider<any>>('editable content data provider')