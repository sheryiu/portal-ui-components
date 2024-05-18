import { Directive, Input, TemplateRef, inject, input } from '@angular/core';

@Directive({
  selector: '[pheadTableOfContentsEntry]'
})
export class TableOfContentsEntryDirective {
  @Input({ required: true, alias: 'pheadTableOfContentsEntry' }) id!: string;
  active = input<boolean>(false, { alias: 'pheadTableOfContentsEntryActive' });
  templateRef = inject(TemplateRef);

}
