import { NgModule } from '@angular/core';
import { ArrayPipe } from './pipes/array.pipe';
import { InputFieldComponent } from './ui';
import { HoverableDirective } from './ui/hoverable.directive';
import { VirtualScrollExtraDirective } from './ui/virtual-scroll-extra.directive';

@NgModule({
  declarations: [],
  imports: [
    HoverableDirective,
    VirtualScrollExtraDirective,
    ArrayPipe,
    InputFieldComponent,
  ],
  exports: [
    HoverableDirective,
    VirtualScrollExtraDirective,
    ArrayPipe,
    InputFieldComponent,
  ]
})
export class PuiBaseModule { }
