import { Directive } from '@angular/core';

@Directive({
  selector: '[puiSectionCard]',
  host: {
    class: 'pui-section-card'
  }
})
export class SectionCardDirective {

  constructor() { }

}
