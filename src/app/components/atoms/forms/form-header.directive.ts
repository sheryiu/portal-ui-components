import { Directive } from '@angular/core';

@Directive({
  selector: '[appFormHeader]',
  standalone: true,
  host: {
    class: 'ds-form-header',
  },
})
export class FormHeaderDirective {

  constructor() { }

}
