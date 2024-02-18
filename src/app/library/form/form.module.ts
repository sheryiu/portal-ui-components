import { NgModule } from '@angular/core';
import { FormFieldDescriptionDirective } from './form-field/form-field-description.directive';
import { FormFieldInputDirective } from './form-field/form-field-input.directive';
import { FormFieldLabelDirective } from './form-field/form-field-label.directive';
import { FormFieldComponent } from './form-field/form-field.component';
import { FormFieldsetComponent } from './form-fieldset/form-fieldset.component';
import { FormSubmitComponent } from './form-submit/form-submit.component';

@NgModule({
  declarations: [],
  imports: [
    FormFieldComponent,
    FormFieldsetComponent,
    FormFieldLabelDirective,
    FormFieldDescriptionDirective,
    FormFieldInputDirective,
    FormSubmitComponent,
  ],
  exports: [
    FormFieldComponent,
    FormFieldsetComponent,
    FormFieldLabelDirective,
    FormFieldDescriptionDirective,
    FormFieldInputDirective,
    FormSubmitComponent,
  ]
})
export class FormModule { }
