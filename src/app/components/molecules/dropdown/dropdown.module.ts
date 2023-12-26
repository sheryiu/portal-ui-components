import { NgModule } from '@angular/core';
import { DropdownOptionDirective } from './dropdown-panel/dropdown-option.directive';
import { DropdownPanelComponent } from './dropdown-panel/dropdown-panel.component';
import { DropdownLabelDirective } from './dropdown/dropdown-label.directive';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
  declarations: [],
  imports: [
    DropdownComponent,
    DropdownOptionDirective,
    DropdownPanelComponent,
    DropdownLabelDirective,
  ],
  exports: [
    DropdownComponent,
    DropdownOptionDirective,
    DropdownLabelDirective,
  ]
})
export class DropdownModule { }
