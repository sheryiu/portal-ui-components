import { Component, ContentChildren, QueryList } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FieldDefDirective } from '../field-def.directive';

@Component({
  selector: 'core-fieldset',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './fieldset.component.html',
  host: {
    class: 'core-fieldset'
  }
})
export class FieldsetComponent {
  @ContentChildren(FieldDefDirective, { emitDistinctChangesOnly: true }) private fieldDefs!: QueryList<FieldDefDirective>;
}
