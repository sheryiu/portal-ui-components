import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[appDropdownLabel]',
  standalone: true
})
export class DropdownLabelDirective {

  templateRef = inject(TemplateRef);

}
