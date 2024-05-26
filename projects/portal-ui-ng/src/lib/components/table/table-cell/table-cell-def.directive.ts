import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[puiTableCellDef]',
  standalone: true,
})
export class TableCellDefDirective {
  templateRef = inject(TemplateRef);
  @Input({ required: true, alias: 'puiTableCellDef' }) columnName!: string;
}