import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'cdk-table[appBaseTable]',
  standalone: true
})
export class BaseTableDirective {

  constructor() { }

  @HostBinding('class') private hostClass = 'ds-base-table'

}
