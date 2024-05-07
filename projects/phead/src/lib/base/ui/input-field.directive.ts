import { Directive } from '@angular/core';

@Directive({
  selector: '[pheadInputField]',
  standalone: true,
  host: {
    class: 'phead-input-field',
  }
})
export class InputFieldDirective {

  constructor() { }

}
