import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[coreFormFieldLabel]',
  standalone: true
})
export class FormFieldLabelDirective {
  templateRef = inject(TemplateRef);
}
