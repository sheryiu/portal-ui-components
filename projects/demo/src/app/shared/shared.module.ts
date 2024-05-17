import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbsComponent, PheadBaseModule, TooltipModule } from 'phead';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PheadBaseModule,
    BreadcrumbsComponent,
    TooltipModule,
  ],
  exports: [
    CommonModule,
    PheadBaseModule,
    BreadcrumbsComponent,
    TooltipModule,
  ]
})
export class SharedModule { }
