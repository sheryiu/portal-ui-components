import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChildren } from '@angular/core';
import { DividerComponent } from '../../../divider';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'pui-form-display',
  imports: [
    NgTemplateOutlet,
    DividerComponent
  ],
  templateUrl: './form-display.component.html',
  styles: ``
})
export class FormDisplayComponent {
  fields = contentChildren(FormFieldComponent)
}
