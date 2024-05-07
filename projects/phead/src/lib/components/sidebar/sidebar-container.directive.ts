import { Directive } from '@angular/core';

@Directive({
  selector: '[pheadSidebarContainer]',
  standalone: true,
  host: {
    class: 'phead-sidebar-container',
  }
})
export class SidebarContainerDirective {

  constructor() { }

}
