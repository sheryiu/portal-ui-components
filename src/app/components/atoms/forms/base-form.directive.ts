import { Directive } from '@angular/core';

@Directive({
  selector: 'dl[appBaseForm], app-base-form',
  standalone: true,
  host: {
    class: 'ds-base-form'
  }
})
export class BaseFormDirective {

  constructor() { }

}
