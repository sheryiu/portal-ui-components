import { Directive } from '@angular/core';
import { HoverableDirective } from '../../../base';

@Directive({
  selector: '[pheadDropdownTrigger]',
  standalone: true,
  host: {
    class: 'phead-dropdown-trigger',
    tabIndex: '0',
  },
  hostDirectives: [
    {
      directive: HoverableDirective,
      inputs: ['hoverableEnabled'],
    }
  ]
})
export class DropdownTriggerDirective {

  constructor() { }

}
