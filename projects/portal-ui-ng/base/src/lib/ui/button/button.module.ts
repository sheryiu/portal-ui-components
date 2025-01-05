import { NgModule } from '@angular/core';
import { BaseButtonDirective } from './base-button.directive';
import { BorderedButtonDirective } from './bordered-button.directive';
import { FilledButtonDirective } from './filled-button.directive';
import { InverseButtonDirective } from './inverse-button.directive';

@NgModule({
  declarations: [],
  imports: [
    BaseButtonDirective,
    BorderedButtonDirective,
    FilledButtonDirective,
    InverseButtonDirective,
  ],
  exports: [
    BaseButtonDirective,
    BorderedButtonDirective,
    FilledButtonDirective,
    InverseButtonDirective,
  ]
})
export class ButtonModule { }
