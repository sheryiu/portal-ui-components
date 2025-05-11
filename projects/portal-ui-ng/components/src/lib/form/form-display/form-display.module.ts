import { NgModule } from '@angular/core';
import { FormDisplayComponent } from './form-display/form-display.component';
import { FormFieldContentDirective } from './form-field-content.directive';
import { FormFieldIconDirective } from './form-field-icon.directive';
import { FormFieldTitleDirective } from './form-field-title.directive';
import { FormFieldComponent } from './form-field/form-field.component';

@NgModule({
  declarations: [],
  imports: [
    FormDisplayComponent,
    FormFieldComponent,
    FormFieldTitleDirective,
    FormFieldContentDirective,
    FormFieldIconDirective,
  ],
  exports: [
    FormDisplayComponent,
    FormFieldComponent,
    FormFieldTitleDirective,
    FormFieldContentDirective,
    FormFieldIconDirective,
  ]
})
export class FormDisplayModule { }
