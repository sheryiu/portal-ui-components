import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[coreTableCellDef]',
  standalone: true,
})
export class TableCellDefDirective {
  templateRef = inject(TemplateRef);
  @Input({ required: true, alias: 'coreTableCellDef' }) columnName!: string;
}