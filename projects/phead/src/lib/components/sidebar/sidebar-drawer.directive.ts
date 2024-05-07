import { Directive, TemplateRef, inject } from '@angular/core';
import { nanoid } from 'nanoid';

@Directive({
  selector: '[pheadSidebarDrawer]',
  standalone: true
})
export class SidebarDrawerDirective {
  readonly id = nanoid();
  templateRef = inject(TemplateRef);

}

@Directive({
  selector: '[pheadSidebarDrawerSection]',
  host: {
    class: 'phead-sidebar-drawer-section'
  }
})
export class SidebarDrawerSectionDirective {}

@Directive({
  selector: '[pheadSidebarDrawerSectionHeader]',
  host: {
    class: 'phead-sidebar-drawer-section__header'
  }
})
export class SidebarDrawerSectionHeaderDirective {}

@Directive({
  selector: '[pheadSidebarDrawerSectionContent]',
  host: {
    class: 'phead-sidebar-drawer-section__content'
  }
})
export class SidebarDrawerSectionContentDirective {}