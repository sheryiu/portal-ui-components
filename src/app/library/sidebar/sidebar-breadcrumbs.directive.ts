import { Directive } from '@angular/core';

@Directive({
  selector: '[coreSidebarBreadcrumbs]',
  standalone: true,
  host: {
    class: 'core-sidebar-container__breadcrumbs',
  }
})
export class SidebarBreadcrumbsDirective {

  constructor() { }

}
