import { NgModule } from '@angular/core';
import { FormsModule as NgForms, ReactiveFormsModule } from '@angular/forms';
import { BaseFormDirective } from './base-form.directive';
import { FormFieldDirective } from './form-field.directive';
import { FormHeaderDirective } from './form-header.directive';
import { FormLabelComponent, FormLabelDescriptionDirective, FormLabelTitleDirective } from './form-label.component';

@NgModule({
  declarations: [],
  imports: [
    BaseFormDirective,
    FormLabelComponent,
    FormFieldDirective,
    FormHeaderDirective,
    FormLabelTitleDirective,
    FormLabelDescriptionDirective,
    NgForms,
    ReactiveFormsModule,
  ],
  exports: [
    BaseFormDirective,
    FormLabelComponent,
    FormFieldDirective,
    FormHeaderDirective,
    FormLabelTitleDirective,
    FormLabelDescriptionDirective,
    NgForms,
    ReactiveFormsModule,
  ],
})
export class FormsModule {}
