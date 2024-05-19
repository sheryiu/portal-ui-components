import { Component, booleanAttribute, input } from '@angular/core';
import { HoverableDirective } from '../hoverable.directive';

@Component({
  selector: 'phead-input-field',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  host: {
    class: 'phead-input-field',
    '[attr.data-borderless]': 'borderless()'
  },
  hostDirectives: [
    { directive: HoverableDirective, inputs: ['hoverableEnabled'] }
  ]
})
export class InputFieldComponent {
  borderless = input(false, { transform: booleanAttribute });
}
