import { Directive, TemplateRef, inject, input } from '@angular/core';

@Directive({
  selector: '[puiTableCellDef]',
  standalone: true,
})
export class TableCellDefDirective {
  templateRef = inject(TemplateRef);
  columnName = input.required<string>({ alias: 'puiTableCellDef' })
}