import { NgModule } from '@angular/core';
import { FieldDefDirective } from './field-def.directive';
import { FieldsetComponent } from './fieldset/fieldset.component';

@NgModule({
  declarations: [],
  imports: [
    FieldsetComponent,
    FieldDefDirective,
  ],
  exports: [
    FieldsetComponent,
    FieldDefDirective,
  ]
})
export class FieldModule { }
