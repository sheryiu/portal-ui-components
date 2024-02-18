import { Component, ContentChild, Input, TemplateRef, ViewChild } from '@angular/core';
import { nanoid } from 'nanoid';
import { SharedModule } from '../../../shared/shared.module';
import { FormFieldDescriptionDirective } from './form-field-description.directive';
import { FormFieldInputDirective } from './form-field-input.directive';
import { FormFieldLabelDirective } from './form-field-label.directive';

@Component({
  selector: 'core-form-field',
  standalone: true,
  imports: [
    SharedModule,
  ],
  template: `
  <ng-template #template>
    <div class="self-start flex flex-col gap-px px-4 pt-1 pb-0.5 @xs/fieldset:py-2">
      @if (label) {
        <span class="font-medium">
          <ng-container [ngTemplateOutlet]="label.templateRef"></ng-container>
        </span>
      }
      @if (description) {
        <span class="text-sm text-secondary">
          <ng-container [ngTemplateOutlet]="description.templateRef"></ng-container>
        </span>
      }
    </div>
    <div class="self-center flex flex-col">
      @if (input) {
        <ng-container [ngTemplateOutlet]="input.templateRef"></ng-container>
      }
    </div>
  </ng-template>
  `,
  styles: ``
})
export class FormFieldComponent {
  @Input() id = nanoid();
  @ContentChild(FormFieldLabelDirective) label?: FormFieldLabelDirective;
  @ContentChild(FormFieldDescriptionDirective) description?: FormFieldDescriptionDirective;
  @ContentChild(FormFieldInputDirective) input?: FormFieldInputDirective;
  @ViewChild('template') templateRef!: TemplateRef<unknown>;
}
