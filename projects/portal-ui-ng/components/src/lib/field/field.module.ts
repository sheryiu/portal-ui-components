import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldDefDirective } from './field-def.directive';
import { FieldsetComponent } from './fieldset/fieldset.component';

@NgModule({
  imports: [
    FieldsetComponent,
    FieldDefDirective,
  ],
  exports: [
    FieldsetComponent,
    FieldDefDirective,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FieldModule { }
