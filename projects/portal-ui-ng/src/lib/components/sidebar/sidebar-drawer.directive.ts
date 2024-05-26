import { Directive, TemplateRef, inject } from '@angular/core';
import { nanoid } from 'nanoid';

@Directive({
  selector: '[puiSidebarDrawer]',
  standalone: true
})
export class SidebarDrawerDirective {
  readonly id = nanoid();
  templateRef = inject(TemplateRef);

}

@Directive({
  selector: '[puiSidebarDrawerSection]',
  host: {
    class: 'pui-sidebar-drawer-section'
  }
})
export class SidebarDrawerSectionDirective {}

@Directive({
  selector: '[puiSidebarDrawerSectionHeader]',
  host: {
    class: 'pui-sidebar-drawer-section__header'
  }
})
export class SidebarDrawerSectionHeaderDirective {}

@Directive({
  selector: '[puiSidebarDrawerSectionContent]',
  host: {
    class: 'pui-sidebar-drawer-section__content'
  }
})
export class SidebarDrawerSectionContentDirective {}