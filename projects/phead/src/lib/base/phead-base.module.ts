import { NgModule } from '@angular/core';
import { ArrayPipe } from './pipes/array.pipe';
import { HardSurfaceDirective } from './ui/hard-surface.directive';
import { HoverableDirective } from './ui/hoverable.directive';
import { StickyHeaderDirective } from './ui/sticky-header.directive';
import { VirtualScrollExtraDirective } from './ui/virtual-scroll-extra.directive';

@NgModule({
  declarations: [],
  imports: [
    HoverableDirective,
    StickyHeaderDirective,
    VirtualScrollExtraDirective,
    HardSurfaceDirective,
    ArrayPipe,
  ],
  exports: [
    HoverableDirective,
    StickyHeaderDirective,
    VirtualScrollExtraDirective,
    HardSurfaceDirective,
    ArrayPipe,
  ]
})
export class PheadBaseModule { }
