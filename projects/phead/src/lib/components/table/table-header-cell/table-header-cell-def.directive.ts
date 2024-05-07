import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[pheadTableHeaderCellDef]',
  standalone: true,
})
export class TableHeaderCellDefDirective {
  templateRef = inject(TemplateRef);
  @Input({ required: true, alias: 'pheadTableHeaderCellDef' }) columnName!: string;
}