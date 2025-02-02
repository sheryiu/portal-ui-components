import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { isNonNull } from 'portal-ui-ng';
import { TableComponent } from './table.component';

@Component({
  selector: 'pui-table-header-row',
  imports: [NgTemplateOutlet],
  host: {
    class: 'pui-table-header-row',
    role: 'rowheader',
  },
  template: `
  <ng-content />
  @for (def of cells(); track def.columnName) {
    <ng-container [ngTemplateOutlet]="def.templateRef"></ng-container>
  }
  `
})
export class TableHeaderRowComponent {
  private table = inject(TableComponent);

  cells = computed(() => {
    const columns = this.table.activeColumns();
    if (columns == null) return undefined;
    const cellDefs = this.table.headerCellDefs();
    return columns
      .map(columnName => cellDefs.find(def => def.columnName() == columnName))
      .filter(isNonNull)
      .map(def => ({
        columnName: def.columnName(),
        templateRef: def.templateRef,
      }))
  })
}
