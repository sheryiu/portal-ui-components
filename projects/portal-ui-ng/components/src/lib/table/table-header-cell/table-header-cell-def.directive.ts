import { Directive, Input, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[puiTableHeaderCellDef]',
  standalone: true,
})
export class TableHeaderCellDefDirective {
  templateRef = inject(TemplateRef);
  @Input({ required: true, alias: 'puiTableHeaderCellDef' }) columnName!: string;
}