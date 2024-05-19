import { Directive, TemplateRef, inject, input } from '@angular/core';
import { nanoid } from 'nanoid';

@Directive({
  selector: '[pheadTab]',
})
export class TabDirective {
  id = input.required<string>({ alias: 'pheadTabId' })
  templateRef = inject(TemplateRef);

  constructor() { }

}
