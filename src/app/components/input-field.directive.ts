import { Directive } from '@angular/core';

@Directive({
  selector: '[coreInputField]',
  standalone: true,
  host: {
    class: 'core-input-field',
  }
})
export class InputFieldDirective {

  constructor() { }

}
