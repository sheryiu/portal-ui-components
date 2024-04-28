import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[coreSidebarMain]',
  standalone: true
})
export class SidebarMainDirective {
  templateRef = inject(TemplateRef);

}
