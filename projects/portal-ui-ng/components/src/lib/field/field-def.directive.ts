import { booleanAttribute, computed, Directive, input, TemplateRef, Type } from '@angular/core';
import { LiteralUnion } from 'portal-ui-ng';

type SupportedTypes = 'string' | 'number' | 'date-time' | 'boolean' | 'array';

@Directive({
  selector: 'pui-field-def'
})
export class FieldDefDirective {
  /**
   * @description Path to the value
   */
  key = input.required<string>();
  base64Key = computed(() => btoa(this.key()))
  readonly label = input.required<string>();
  readonly description = input<string | Type<unknown>>();
  readonly fieldType = input.required<LiteralUnion<SupportedTypes>>();
  readonly fieldConfig = input<{
    enum?: (string | number)[];
    'string'?: {};
    'number'?: {};
  }>();
  readonly defaultValue = input<any>();
  isNullable = input(true, { transform: booleanAttribute })

  readonly templateRef = input<TemplateRef<unknown>>();
}
