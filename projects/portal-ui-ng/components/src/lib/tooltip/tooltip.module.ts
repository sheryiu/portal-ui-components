import { NgComponentOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  declarations: [
    TooltipDirective,
    TooltipComponent,
  ],
  imports: [
    NgComponentOutlet,
  ],
  exports: [
    TooltipDirective,
  ]
})
export class TooltipModule { }
