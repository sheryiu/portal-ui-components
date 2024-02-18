import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[coreFormFieldInput]',
  standalone: true
})
export class FormFieldInputDirective {
  templateRef = inject(TemplateRef);
}
