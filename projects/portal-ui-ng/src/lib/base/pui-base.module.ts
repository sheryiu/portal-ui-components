import { NgModule } from '@angular/core';
import { ArrayPipe } from './pipes/array.pipe';
import { InputFieldComponent } from './ui';
import { HoverableDirective } from './ui/hoverable.directive';

@NgModule({
  declarations: [],
  imports: [
    HoverableDirective,
    ArrayPipe,
    InputFieldComponent,
  ],
  exports: [
    HoverableDirective,
    ArrayPipe,
    InputFieldComponent,
  ]
})
export class PuiBaseModule { }
