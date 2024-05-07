import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[pheadTableCellDef]',
  standalone: true,
})
export class TableCellDefDirective {
  templateRef = inject(TemplateRef);
  @Input({ required: true, alias: 'pheadTableCellDef' }) columnName!: string;
}