import { Directive, TemplateRef, inject } from '@angular/core';
import { nanoid } from 'nanoid';

@Directive({
  selector: '[coreSidebarDrawer]',
  standalone: true
})
export class SidebarDrawerDirective {
  readonly id = nanoid();
  templateRef = inject(TemplateRef);

}

@Directive({
  selector: '[coreSidebarDrawerSection]',
  host: {
    class: 'core-sidebar-drawer-section'
  }
})
export class SidebarDrawerSectionDirective {}

@Directive({
  selector: '[coreSidebarDrawerSectionHeader]',
  host: {
    class: 'core-sidebar-drawer-section__header'
  }
})
export class SidebarDrawerSectionHeaderDirective {}

@Directive({
  selector: '[coreSidebarDrawerSectionContent]',
  host: {
    class: 'core-sidebar-drawer-section__content'
  }
})
export class SidebarDrawerSectionContentDirective {}