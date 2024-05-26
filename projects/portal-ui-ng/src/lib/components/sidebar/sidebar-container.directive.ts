import { Directive } from '@angular/core';

@Directive({
  selector: '[puiSidebarContainer]',
  standalone: true,
  host: {
    class: 'pui-sidebar-container',
  }
})
export class SidebarContainerDirective {

  constructor() { }

}
