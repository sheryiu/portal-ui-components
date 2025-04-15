import { Directive, TemplateRef, booleanAttribute, inject, input } from '@angular/core';

@Directive({
  selector: '[puiTab]',
  standalone: true,
})
export class TabDirective {
  id = input.required<string>({ alias: 'puiTab' })
  hidden = input(false, { alias: 'puiTabHidden', transform: booleanAttribute })
  templateRef = inject(TemplateRef);

  constructor() { }

}
