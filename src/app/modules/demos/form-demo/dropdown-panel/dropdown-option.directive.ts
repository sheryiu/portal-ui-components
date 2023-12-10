import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[appDropdownOption]',
  standalone: true
})
export class DropdownOptionDirective {

  templateRef = inject(TemplateRef);

}
