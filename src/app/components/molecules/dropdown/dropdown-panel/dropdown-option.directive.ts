import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[appDropdownOption]',
  standalone: true
})
export class DropdownOptionDirective<T = unknown> {

  templateRef = inject(TemplateRef);

  @Input({ required: true, alias: 'appDropdownOption' }) value!: T;

}
