import { Directive } from '@angular/core';
import { AccordionService } from './accordion.service';

@Directive({
  selector: '[puiAccordionContainer]',
  standalone: true,
  providers: [
    AccordionService,
  ]
})
export class AccordionContainerDirective {

  constructor() { }

}
