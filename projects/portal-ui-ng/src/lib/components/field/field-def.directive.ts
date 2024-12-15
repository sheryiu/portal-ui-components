import { booleanAttribute, Directive, input, Input, TemplateRef, Type } from '@angular/core';
import { LiteralUnion } from '../../base';

type SupportedTypes = 'string' | 'number' | 'date-time' | 'boolean' | 'array';

@Directive({
  selector: 'pui-field-def',
})
export class FieldDefDirective {
  /**
   * @description Delimited by `>` character
   */
  @Input() key!: string;
  @Input() label!: string;
  @Input() description?: string | Type<unknown>;
  @Input() fieldType!: LiteralUnion<SupportedTypes>;
  @Input() fieldConfig?: {
    enum?: (string | number)[],
    'string'?: {},
    'number'?: {},
  }
  @Input() defaultValue?: any;
  isNullable = input(true, { transform: booleanAttribute })

  @Input() templateRef?: TemplateRef<unknown>;
}
