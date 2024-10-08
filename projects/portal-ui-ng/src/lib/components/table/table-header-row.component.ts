import { NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, Component, HostBinding, TemplateRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TableHeaderCellDefDirective } from './table-header-cell/table-header-cell-def.directive';
import { TableComponent } from './table.component';

@Component({
  selector: 'pui-table-header-row',
  standalone: true,
  imports: [NgTemplateOutlet],
  host: {
    class: 'pui-table-header-row',
    role: 'rowheader',
  },
  template: `
  <ng-content />
  @for (def of cells; track def.columnName) {
    <ng-container [ngTemplateOutlet]="def.templateRef"></ng-container>
  }
  `
})
export class TableHeaderRowComponent implements AfterContentInit {
  @HostBinding('style.grid-column-end') private hostColumnEnd?: string;
  private table = inject(TableComponent);

  cells?: { columnName: string; templateRef: TemplateRef<unknown> }[];

  constructor() {
    this.table.responsiveUpdated$.pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.checkColumns();
    })
  }

  ngAfterContentInit(): void {
    this.checkColumns();
  }

  checkColumns() {
    this.cells = this.table.activeColumns
      ?.map(columnName => this.table.headerCellDefs.find(def => def.columnName === columnName))
      .filter((def): def is TableHeaderCellDefDirective => def != null)
      .map(def => ({
        columnName: def.columnName,
        templateRef: def.templateRef,
      }))
    this.hostColumnEnd = `span ${ this.cells?.length }`
  }
}
