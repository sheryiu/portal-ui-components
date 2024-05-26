import { Directive } from '@angular/core';
import { HoverableDirective } from '../../../base';

@Directive({
  selector: '[puiQuickAccessComponent]',
  standalone: true,
  host: {
    class: 'pui-quick-access-component'
  },
  hostDirectives: [
    {
      directive: HoverableDirective,
    },
  ]
})
export class QuickAccessComponentDirective {

  constructor() { }

}
