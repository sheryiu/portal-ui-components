import { Directive, TemplateRef, inject, input } from '@angular/core';

@Directive({
  selector: '[pheadTab]',
})
export class TabDirective {
  id = input.required<string>({ alias: 'pheadTab' })
  templateRef = inject(TemplateRef);

  constructor() { }

}
