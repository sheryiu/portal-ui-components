import { NgModule } from '@angular/core';
import { SearchInputLabelDirective } from '../search-input/search-input-label.directive';
import { SearchInputSuggestionItemDirective } from '../search-input/search-input-suggestion-item.directive';
import { TableBodyDirective } from './table-body.directive';
import { TableCellDefDirective } from './table-cell-def.directive';
import { TableCellComponent } from './table-cell.component';
import { TableFilterBySearchComponent } from './table-filter-by-search/table-filter-by-search.component';
import { TableFilterByTextComponent } from './table-filter-by-text/table-filter-by-text.component';
import { TableFooterRowDirective } from './table-footer-row.directive';
import { TableHeaderCellDefDirective } from './table-header-cell-def.directive';
import { TableHeaderCellComponent, TableHeaderCellFilterDirective, TableHeaderCellSortDirective } from './table-header-cell.component';
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
    SearchInputLabelDirective,
    SearchInputSuggestionItemDirective,
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
    TableHeaderCellSortDirective,
    TableHeaderCellFilterDirective,
    TableFilterByTextComponent,
    TableFilterBySearchComponent,
    SearchInputLabelDirective,
    SearchInputSuggestionItemDirective,
    TableFooterRowDirective,
    TableSimpleFooterComponent,
  ]
})
export class TableModule { }
