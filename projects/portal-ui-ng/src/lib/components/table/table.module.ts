import { NgModule } from '@angular/core';
import { TableBodyDirective } from './table-body.directive';
import { TableCellDefDirective } from './table-cell/table-cell-def.directive';
import { TableCellComponent } from './table-cell/table-cell.component';
import { TableFooterRowDirective } from './table-footer-row.directive';
import { TableHeaderCellDefDirective } from './table-header-cell/table-header-cell-def.directive';
import { TableHeaderCellComponent } from './table-header-cell/table-header-cell.component';
import { TableHeaderRowComponent } from './table-header-row.component';
import { TableRowComponent } from './table-row.component';
import { TableSimpleFooterComponent } from './table-simple-footer/table-simple-footer.component';
import { TableVirtualViewportDirective } from './table-virtual-viewport.directive';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [],
  imports: [
    TableComponent,
    TableVirtualViewportDirective,
    TableBodyDirective,
    TableRowComponent,
    TableHeaderRowComponent,
    TableCellComponent,
    TableCellDefDirective,
    TableHeaderCellComponent,
    TableHeaderCellDefDirective,
    TableFooterRowDirective,
    TableSimpleFooterComponent,
  ],
  exports: [
    TableComponent,
    TableVirtualViewportDirective,
    TableBodyDirective,
    TableRowComponent,
    TableHeaderRowComponent,
    TableCellComponent,
    TableCellDefDirective,
    TableHeaderCellComponent,
    TableHeaderCellDefDirective,
    TableFooterRowDirective,
    TableSimpleFooterComponent,
  ]
})
export class TableModule { }
