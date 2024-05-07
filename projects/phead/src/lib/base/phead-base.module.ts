import { NgModule } from '@angular/core';
import { ArrayPipe } from './pipes/array.pipe';
import { HardSurfaceDirective } from './ui/hard-surface.directive';
import { HoverableDirective } from './ui/hoverable.directive';
import { InputFieldDirective } from './ui/input-field.directive';
import { StickyHeaderDirective } from './ui/sticky-header.directive';
import { VirtualScrollExtraDirective } from './ui/virtual-scroll-extra.directive';

@NgModule({
  declarations: [],
  imports: [
    HoverableDirective,
    StickyHeaderDirective,
    VirtualScrollExtraDirective,
    InputFieldDirective,
    HardSurfaceDirective,
    ArrayPipe,
  ],
  exports: [
    HoverableDirective,
    StickyHeaderDirective,
    VirtualScrollExtraDirective,
    InputFieldDirective,
    HardSurfaceDirective,
    ArrayPipe,
  ]
})
export class PheadBaseModule { }
