import { NgClass, NgTemplateOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HardSurfaceDirective, HoverableDirective, InputFieldComponent } from '../../base';
import { AutocompleteModule } from '../autocomplete';
import { CalendarTriggerDirective } from '../calendar';
import { ToggleComponent } from '../form';
import { ArrayFieldComponent } from './array-field/array-field.component';
import { FieldDefDirective } from './field-def.directive';
import { FieldsetComponent } from './fieldset/fieldset.component';

@NgModule({
  declarations: [
    FieldsetComponent,
    FieldDefDirective,
    ArrayFieldComponent,
  ],
  imports: [
    NgClass,
    HoverableDirective,
    HardSurfaceDirective,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteModule,
    CalendarTriggerDirective,
    InputFieldComponent,
    ToggleComponent,
    NgTemplateOutlet,
  ],
  exports: [
    FieldsetComponent,
    FieldDefDirective,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FieldModule { }
