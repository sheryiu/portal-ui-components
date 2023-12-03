import { NgModule } from '@angular/core';
import { RadioGroupComponent, RadioOptionDirective } from './radio-group.component';

@NgModule({
  declarations: [],
  imports: [
    RadioGroupComponent,
    RadioOptionDirective,
  ],
  exports: [
    RadioGroupComponent,
    RadioOptionDirective,
  ]
})
export class RadioGroupModule { }
