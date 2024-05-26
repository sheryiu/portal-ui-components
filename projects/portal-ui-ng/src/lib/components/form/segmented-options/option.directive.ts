import { Directive, Input, TemplateRef, inject } from '@angular/core';
import { nanoid } from 'nanoid';

@Directive({
  selector: '[puiOption]',
  standalone: true
})
export class OptionDirective<T> {
  templateRef = inject(TemplateRef);
  @Input() id = nanoid();
  @Input({ required: true, alias: 'puiOption' }) value!: T;
}
