import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[coreSearchInputSuggestionItem]',
  standalone: true
})
export class SearchInputSuggestionItemDirective {
  templateRef = inject(TemplateRef);
  @Input() height: number = 36;
}
