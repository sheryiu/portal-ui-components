import { NgModule } from '@angular/core';
import { SearchInputLabelDirective, SearchInputSuggestionItemDirective } from '../form';
import { TableBodyDirective } from './table-body.directive';
import { TableCellDefDirective } from './table-cell/table-cell-def.directive';
import { TableCellComponent } from './table-cell/table-cell.component';
import { TableFilterBySearchComponent } from './table-filter-by-search/table-filter-by-search.component';
import { TableFilterByTextComponent } from './table-filter-by-text/table-filter-by-text.component';
import { TableFooterRowDirective } from './table-footer-row.directive';
import { TableHeaderCellDefDirective } from './table-header-cell/table-header-cell-def.directive';
import { TableHeaderCellComponent, TableHeaderCellFilterDirective, TableHeaderCellSortDirective } from './table-header-cell/table-header-cell.component';
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
    TableHeaderCellSortDirective,
    TableHeaderCellFilterDirective,
    TableFilterByTextComponent,
    TableFilterBySearchComponent,
    TableFooterRowDirective,
    TableSimpleFooterComponent,
    SearchInputLabelDirective,
    SearchInputSuggestionItemDirective,
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
    TableHeaderCellSortDirective,
    TableHeaderCellFilterDirective,
    TableFilterByTextComponent,
    TableFilterBySearchComponent,
    TableFooterRowDirective,
    TableSimpleFooterComponent,
    SearchInputLabelDirective,
    SearchInputSuggestionItemDirective,
  ]
})
export class TableModule { }
