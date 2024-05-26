import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[puiSidebarMain]',
  standalone: true
})
export class SidebarMainDirective {
  templateRef = inject(TemplateRef);

}
