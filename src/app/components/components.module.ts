import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { HoverableDirective } from './hoverable.directive';
import { InputFieldDirective } from './input-field.directive';
import { PipesModule } from './pipes/pipes.module';
import { StickyHeaderDirective } from './sticky-header.directive';
import { VirtualScrollExtraDirective } from './virtual-scroll-extra.directive';

@NgModule({
  declarations: [],
  imports: [
    ScrollingModule,
    HoverableDirective,
    StickyHeaderDirective,
    VirtualScrollExtraDirective,
    InputFieldDirective,
    PipesModule,
  ],
  exports: [
    ScrollingModule,
    HoverableDirective,
    StickyHeaderDirective,
    VirtualScrollExtraDirective,
    InputFieldDirective,
    PipesModule,
  ]
})
export class ComponentsModule { }
