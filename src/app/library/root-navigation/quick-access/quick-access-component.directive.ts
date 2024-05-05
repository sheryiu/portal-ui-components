import { Directive } from '@angular/core';
import { HoverableDirective } from '../../../components/hoverable.directive';

@Directive({
  selector: '[coreQuickAccessComponent]',
  standalone: true,
  host: {
    class: 'core-quick-access-component'
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
