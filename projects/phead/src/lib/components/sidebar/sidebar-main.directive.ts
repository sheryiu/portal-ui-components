import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[pheadSidebarMain]',
  standalone: true
})
export class SidebarMainDirective {
  templateRef = inject(TemplateRef);

}
