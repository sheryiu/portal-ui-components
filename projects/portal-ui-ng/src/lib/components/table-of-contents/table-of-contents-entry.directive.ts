import { Directive, Input, TemplateRef, inject, input } from '@angular/core';

@Directive({
  selector: '[puiTableOfContentsEntry]'
})
export class TableOfContentsEntryDirective {
  @Input({ required: true, alias: 'puiTableOfContentsEntry' }) id!: string;
  active = input<boolean>(false, { alias: 'puiTableOfContentsEntryActive' });
  templateRef = inject(TemplateRef);

}
