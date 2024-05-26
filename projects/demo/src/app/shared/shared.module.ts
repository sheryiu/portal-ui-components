import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbsComponent, PuiBaseModule, TooltipModule } from 'portal-ui-ng';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PuiBaseModule,
    BreadcrumbsComponent,
    TooltipModule,
  ],
  exports: [
    CommonModule,
    PuiBaseModule,
    BreadcrumbsComponent,
    TooltipModule,
  ]
})
export class SharedModule { }
