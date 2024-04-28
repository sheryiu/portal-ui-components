import { Directive } from '@angular/core';

@Directive({
  selector: '[coreSidebarContainer]',
  standalone: true,
  host: {
    class: 'core-sidebar-container',
  }
})
export class SidebarContainerDirective {

  constructor() { }

}
