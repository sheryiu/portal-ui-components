import { Directive } from '@angular/core';

@Directive({
  selector: '[puiSidebarBreadcrumbs]',
  standalone: true,
  host: {
    class: 'pui-sidebar-container__breadcrumbs',
  }
})
export class SidebarBreadcrumbsDirective {

  constructor() { }

}
