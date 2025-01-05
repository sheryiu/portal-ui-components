import { Directive, TemplateRef, inject, input } from '@angular/core';

@Directive({
  selector: '[puiTab]',
})
export class TabDirective {
  id = input.required<string>({ alias: 'puiTab' })
  templateRef = inject(TemplateRef);

  constructor() { }

}
