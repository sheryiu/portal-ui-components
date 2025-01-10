import { Directive, TemplateRef, inject, input } from '@angular/core';


/**
 * Declare a property in .ts like:
 * ```typescript
 * type!: YOUR_TYPE;
 * ```
 *
 * Then, use in .html like:
 * ```html
 * <pui-table-cell *puiTableCellDef="'timestamp'; context: type; let item">
 * </pui-table-cell>
 * ```
 *
 * The template variable `item` will be of the type `YOUR_TYPE`
 */
@Directive({
  selector: '[puiTableCellDef]',
  standalone: true,
})
export class TableCellDefDirective<T = unknown> {
  templateRef = inject(TemplateRef<T>);
  columnName = input.required<string>({ alias: 'puiTableCellDef' })
  type = input<T>(undefined as any, { alias: 'puiTableCellDefType' })

  static ngTemplateContextGuard<T>(dir: TableCellDefDirective<T>, ctx: unknown): ctx is { $implicit: T } { return true; }
}