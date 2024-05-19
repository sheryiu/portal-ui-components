import { NgModule } from '@angular/core';
import { ArrayPipe } from './pipes/array.pipe';
import { InputFieldComponent } from './ui';
import { HardSurfaceDirective } from './ui/hard-surface.directive';
import { HoverableDirective } from './ui/hoverable.directive';
import { VirtualScrollExtraDirective } from './ui/virtual-scroll-extra.directive';

@NgModule({
  declarations: [],
  imports: [
    HoverableDirective,
    VirtualScrollExtraDirective,
    HardSurfaceDirective,
    ArrayPipe,
    InputFieldComponent,
  ],
  exports: [
    HoverableDirective,
    VirtualScrollExtraDirective,
    HardSurfaceDirective,
    ArrayPipe,
    InputFieldComponent,
  ]
})
export class PheadBaseModule { }
