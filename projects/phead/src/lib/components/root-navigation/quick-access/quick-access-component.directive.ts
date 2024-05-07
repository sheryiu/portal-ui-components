import { Directive } from '@angular/core';
import { HoverableDirective } from '../../../base';

@Directive({
  selector: '[pheadQuickAccessComponent]',
  standalone: true,
  host: {
    class: 'phead-quick-access-component'
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
