import { booleanAttribute, Component, input, numberAttribute, TemplateRef, viewChild } from '@angular/core';
import { uniqueId } from 'lodash-es';

@Component({
  selector: 'pui-form-field',
  imports: [],
  templateUrl: './form-field.component.html',
})
export class FormFieldComponent {
  id = input<string>(uniqueId())
  hideDivider = input(false, { transform: booleanAttribute })
  /** number of "layers" to pad left */
  padStart = input(0, { transform: numberAttribute })

  templateRef = viewChild.required(TemplateRef)
}
