import { booleanAttribute, computed, Directive, input, TemplateRef, Type } from '@angular/core';
import { uniqueId } from 'lodash-es';
import { LiteralUnion } from 'portal-ui-ng';

type SupportedTypes = 'string' | 'number' | 'date-time' | 'boolean' | 'array';

@Directive({
  selector: 'pui-field-def'
})
export class FieldDefDirective {
  private _random = uniqueId()
  /**
   * @description Path to the value
   */
  key = input.required<string>();
  base64Key = computed(() => this._random + '_' + btoa(this.key()))
  readonly label = input.required<string>();
  readonly description = input<string | Type<unknown>>();
  readonly fieldType = input.required<LiteralUnion<SupportedTypes>>();
  fieldTypeClassName = computed(() => {
    switch (this.fieldType()) {
      case 'boolean':
        return 'pui-fieldset__input--boolean';
      case 'number':
        return 'pui-fieldset__input--number';
      case 'date-time':
        return 'pui-fieldset__input--date-time';
      case 'array':
        return 'pui-fieldset__input--array';
      case 'string':
      default:
        return 'pui-fieldset__input--string';
    }
  })
  readonly fieldConfig = input<{
    enum?: (string | number)[];
    'string'?: {};
    'number'?: {};
    'date-time'?: {
      format?: LiteralUnion<'timeAgo', string>
    };
  }>();
  readonly defaultValue = input<any>();
  isNullable = input(true, { transform: booleanAttribute })

  readonly templateRef = input<TemplateRef<unknown>>();
}
