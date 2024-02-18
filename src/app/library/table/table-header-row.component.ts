import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import { Component, ContentChildren, HostBinding, QueryList, ViewContainerRef, inject } from '@angular/core';
import { map, tap } from 'rxjs';
import { TableHeaderCellDefDirective } from './table-header-cell-def.directive';
import { TableComponent } from './table.component';

@Component({
  selector: 'core-table-header-row',
  standalone: true,
  imports: [AsyncPipe, PortalModule],
  host: {
    class: 'core-table-header-row',
    role: 'rowheader',
  },
  template: `
  @for (def of cells$ | async; track def.columnName) {
    <ng-container [cdkPortalOutlet]="def.portal"></ng-container>
  }
  `
})
export class TableHeaderRowComponent {
  @ContentChildren(TableHeaderCellDefDirective) private cellDefs!: QueryList<TableHeaderCellDefDirective>;
  @HostBinding('style.grid-column-end') private hostColumnEnd?: string;
  private table = inject(TableComponent);
  private vcr = inject(ViewContainerRef);

  cells$ = this.table.columns$.pipe(
    map(columns => columns
      .map(columnName => this.cellDefs.find(def => def.columnName === columnName))
      .filter((def): def is TableHeaderCellDefDirective => def != null)
      .map(def => ({
        columnName: def.columnName,
        portal: new TemplatePortal(def.templateRef, this.vcr),
      }))
    ),
    tap((defs) => this.hostColumnEnd = `span ${ defs.length }`)
  )
}
