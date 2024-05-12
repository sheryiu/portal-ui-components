import { Directive, ElementRef, Input, TemplateRef, Type, inject } from '@angular/core';
import { LiteralUnion } from '../../base';

type SupportedTypes = 'string' | 'number' | 'date-time' | 'boolean';

@Directive({
  selector: 'phead-field-def',
  standalone: true
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

  @Input() templateRef?: TemplateRef<unknown>;
}
