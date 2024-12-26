import { LiteralUnion } from '../../base';

export type FieldConfiguration = ObjectFieldConfiguration | NumberFieldConfiguration | BooleanFieldConfiguration | StringFieldConfiguration | ArrayFieldConfiguration | DateTimeFieldConfiguration;

export type ObjectFieldConfiguration = {
  type: 'object';
  description?: string;
  properties: Record<string, FieldConfiguration>;
}

export type NumberFieldConfiguration = {
  type: 'number';
  description?: string;
  enum?: number[];
}

export type BooleanFieldConfiguration = {
  type: 'boolean';
  description?: string;
}

export type StringFieldConfiguration = {
  type: 'string';
  description?: string;
  // pattern?: string;
  enum?: string[];
}

export type ArrayFieldConfiguration = {
  type: 'array';
  description?: string;
  items: FieldConfiguration;
}

export type DateTimeFieldConfiguration = {
  type: 'date-time';
  description?: string;
  format?: LiteralUnion<'timeAgo', string>;
}