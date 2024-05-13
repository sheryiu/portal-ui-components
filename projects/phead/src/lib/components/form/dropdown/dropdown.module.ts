import { NgTemplateOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { HoverableDirective } from '../../../base';
import { DropdownComponent, DropdownOverlayDirective, DropdownTriggerDirective } from './dropdown.component';
import { SearchDropdownComponent } from './search-dropdown';

@NgModule({
  declarations: [
    DropdownComponent,
    DropdownTriggerDirective,
    DropdownOverlayDirective,
  ],
  imports: [
    HoverableDirective,
    NgTemplateOutlet,
    SearchDropdownComponent,
  ],
  exports: [
    DropdownComponent,
    DropdownTriggerDirective,
    DropdownOverlayDirective,
    SearchDropdownComponent,
  ]
})
export class DropdownModule { }
