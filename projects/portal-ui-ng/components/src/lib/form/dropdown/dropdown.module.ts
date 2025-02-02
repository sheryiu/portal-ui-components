import { NgModule } from '@angular/core';
import { BaseDropdownComponent } from './base-dropdown/base-dropdown.component';
import { DropdownComponent, DropdownOverlayDirective, DropdownTriggerDirective } from './dropdown.component';
import { SearchDropdownComponent } from './search-dropdown';

@NgModule({
  imports: [
    DropdownComponent,
    DropdownTriggerDirective,
    DropdownOverlayDirective,
    BaseDropdownComponent,
    SearchDropdownComponent,
  ],
  exports: [
    DropdownComponent,
    DropdownTriggerDirective,
    DropdownOverlayDirective,
    BaseDropdownComponent,
    SearchDropdownComponent,
  ]
})
export class DropdownModule { }
