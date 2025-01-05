import { NgClass, NgTemplateOutlet } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HoverableDirective, InputFieldComponent } from 'portal-ui-ng/base';
import { AutocompleteModule } from '../autocomplete';
import { CalendarTriggerDirective } from '../calendar-trigger';
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
