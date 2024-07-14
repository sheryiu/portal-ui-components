import { NgTemplateOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { HoverableDirective } from '../../../base';
import { BaseDropdownComponent } from './base-dropdown/base-dropdown.component';
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
