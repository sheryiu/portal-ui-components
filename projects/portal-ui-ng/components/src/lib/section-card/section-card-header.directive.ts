import { Directive } from '@angular/core';

@Directive({
  selector: '[puiSectionCardHeader]',
  host: {
    class: 'pui-section-card__header'
  }
})
export class SectionCardHeaderDirective {

  constructor() { }

}
