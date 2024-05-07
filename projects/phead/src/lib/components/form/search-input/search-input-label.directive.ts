import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[pheadSearchInputLabel]',
  standalone: true
})
export class SearchInputLabelDirective {
  templateRef = inject(TemplateRef);
}
