import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[coreSearchInputLabel]',
  standalone: true
})
export class SearchInputLabelDirective {
  templateRef = inject(TemplateRef);
}
