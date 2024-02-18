import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[coreTableHeaderCellDef]',
  standalone: true,
})
export class TableHeaderCellDefDirective {
  templateRef = inject(TemplateRef);
  @Input({ required: true, alias: 'coreTableHeaderCellDef' }) columnName!: string;
}