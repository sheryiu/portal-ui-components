import { NgModule } from '@angular/core';
import { OptionDirective } from './option.directive';
import { SegmentedOptionsComponent } from './segmented-options.component';

@NgModule({
  declarations: [],
  imports: [
    SegmentedOptionsComponent,
    OptionDirective,
  ],
  exports: [
    SegmentedOptionsComponent,
    OptionDirective,
  ]
})
export class SegmentedOptionsModule { }
