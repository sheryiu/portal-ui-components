import { Directive } from '@angular/core';
import { AccordionService } from './accordion.service';

@Directive({
  selector: '[pheadAccordionContainer]',
  standalone: true,
  providers: [
    AccordionService,
  ]
})
export class AccordionContainerDirective {

  constructor() { }

}
