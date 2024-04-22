import { Directive, Input, Type } from '@angular/core';
import { LiteralUnion } from '../../components/utils/literal-union';

type SupportedTypes = 'string' | 'number';

@Directive({
  selector: '[coreFieldDef]',
  standalone: true
})
export class FieldDefDirective {
  @Input() key!: string;
  @Input() label!: string;
  @Input() description?: string | Type<unknown>;
  @Input() fieldType!: LiteralUnion<SupportedTypes>;
  @Input() fieldConfig?: {
    'string'?: {},
    'number'?: {},
  }

}
