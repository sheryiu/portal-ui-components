import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[coreFormFieldDescription]',
  standalone: true
})
export class FormFieldDescriptionDirective {
  templateRef = inject(TemplateRef);
}
