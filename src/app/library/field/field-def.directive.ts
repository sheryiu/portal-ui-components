import { Directive, Input, Type } from '@angular/core';
import { LiteralUnion } from '../../components/utils/literal-union';

type SupportedTypes = 'string' | 'number' | 'date-time';

@Directive({
  selector: '[coreFieldDef], core-field-def',
  standalone: true
})
export class FieldDefDirective {
  /**
   * @description Delimited by `>` character
   */
  @Input({ alias: 'coreFieldDef' }) key!: string;
  @Input({ alias: 'coreFieldDefLabel' }) label!: string;
  @Input() description?: string | Type<unknown>;
  @Input({ alias: 'coreFieldType' }) fieldType!: LiteralUnion<SupportedTypes>;
  @Input() fieldConfig?: {
    enum?: (string | number)[],
    'string'?: {},
    'number'?: {},
  }
  @Input() defaultValue?: any;

}
