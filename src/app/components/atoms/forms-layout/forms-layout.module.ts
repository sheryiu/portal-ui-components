import { NgModule } from '@angular/core';
import { FormsModule as NgForms, ReactiveFormsModule } from '@angular/forms';
import { BaseFormDirective } from './base-form.directive';
import { FormFieldComponent } from './form-field.component';
import { FormHeaderDirective } from './form-header.directive';
import { FormLabelComponent, FormLabelDescriptionDirective, FormLabelTitleDirective } from './form-label.component';

@NgModule({
  declarations: [],
  imports: [
    BaseFormDirective,
    FormLabelComponent,
    FormFieldComponent,
    FormHeaderDirective,
    FormLabelTitleDirective,
    FormLabelDescriptionDirective,
    NgForms,
    ReactiveFormsModule,
  ],
  exports: [
    BaseFormDirective,
    FormLabelComponent,
    FormFieldComponent,
    FormHeaderDirective,
    FormLabelTitleDirective,
    FormLabelDescriptionDirective,
    NgForms,
    ReactiveFormsModule,
  ],
})
export class FormsLayoutModule {}
