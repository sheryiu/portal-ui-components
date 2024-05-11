import { Component } from '@angular/core';
import { HoverableDirective } from '../hoverable.directive';

@Component({
  selector: 'phead-input-field',
  standalone: true,
  imports: [],
  template: `<ng-content></ng-content>`,
  host: {
    class: 'phead-input-field',
  },
  hostDirectives: [
    { directive: HoverableDirective, inputs: ['hoverableEnabled'] }
  ]
})
export class InputFieldComponent {

}
