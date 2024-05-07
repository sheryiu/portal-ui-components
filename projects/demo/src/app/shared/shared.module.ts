import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbsComponent, PheadBaseModule } from 'phead';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PheadBaseModule,
    BreadcrumbsComponent,
  ],
  exports: [
    CommonModule,
    PheadBaseModule,
    BreadcrumbsComponent,
  ]
})
export class SharedModule { }
