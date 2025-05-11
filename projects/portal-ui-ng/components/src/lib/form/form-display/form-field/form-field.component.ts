import { Component, input, TemplateRef, viewChild } from '@angular/core';
import { uniqueId } from 'lodash-es';

@Component({
  selector: 'pui-form-field',
  imports: [],
  templateUrl: './form-field.component.html',
  styles: ``
})
export class FormFieldComponent {
  id = input<string>(uniqueId())

  templateRef = viewChild.required(TemplateRef)
}
