import { Directive } from '@angular/core';

@Directive({
  selector: '[pheadSidebarBreadcrumbs]',
  standalone: true,
  host: {
    class: 'phead-sidebar-container__breadcrumbs',
  }
})
export class SidebarBreadcrumbsDirective {

  constructor() { }

}
