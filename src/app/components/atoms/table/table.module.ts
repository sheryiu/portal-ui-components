import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { BaseTableDirective } from './base-table.directive';
import { CellFlushDirective } from './cell-flush.directive';

@NgModule({
  declarations: [],
  imports: [
    CdkTableModule,
    BaseTableDirective,
    CellFlushDirective,
  ],
  exports: [
    CdkTableModule,
    BaseTableDirective,
    CellFlushDirective,
  ]
})
export class TableModule { }
