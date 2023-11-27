import { Component, Input, Optional } from '@angular/core';
import { BaseFormDirective } from './base-form.directive';

@Component({
  selector: 'dt[appFormLabel], app-form-label',
  standalone: true,
  host: {
    class: 'ds-form-label'
  },
  template: `
    <label [attr.for]="for">
      <ng-content></ng-content>
    </label>
  `
})
export class FormLabelComponent {

  constructor(
    @Optional() private parent: BaseFormDirective,
  ) {
    if (parent == null) console.warn('ds-form-label must be used within a base-form')
  }

  @Input() for?: string | null = null;
}
