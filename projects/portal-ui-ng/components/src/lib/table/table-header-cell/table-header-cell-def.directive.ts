import { Directive, TemplateRef, inject, input } from '@angular/core';

@Directive({
  selector: '[puiTableHeaderCellDef]',
  standalone: true,
})
export class TableHeaderCellDefDirective {
  templateRef = inject(TemplateRef);
  readonly columnName = input.required<string>({ alias: "puiTableHeaderCellDef" });
}