import { Directive, Input, TemplateRef, inject } from '@angular/core';
import { nanoid } from 'nanoid';

@Directive({
  selector: '[pheadOption]',
  standalone: true
})
export class OptionDirective<T> {
  templateRef = inject(TemplateRef);
  @Input() id = nanoid();
  @Input({ required: true, alias: 'pheadOption' }) value!: T;
}
