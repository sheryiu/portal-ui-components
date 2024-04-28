import { Directive, TemplateRef, inject } from '@angular/core';
import { nanoid } from 'nanoid';

@Directive({
  selector: '[coreSidebarDrawer]',
  standalone: true
})
export class SidebarDrawerDirective {
  id = nanoid();
  templateRef = inject(TemplateRef);

}
