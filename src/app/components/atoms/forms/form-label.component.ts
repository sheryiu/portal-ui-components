import { AfterContentChecked, Component, ContentChild, Directive, HostBinding, Input, Optional } from '@angular/core';
import { BaseFormDirective } from './base-form.directive';

@Directive({
  selector: '[appFormLabelTitle]',
  host: {
    class: 'ds-form-label-title'
  },
  standalone: true,
})
export class FormLabelTitleDirective {
}

@Directive({
  selector: '[appFormLabelDescription]',
  host: {
    class: 'ds-form-label-description'
  },
  standalone: true,
})
export class FormLabelDescriptionDirective {
}

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
export class FormLabelComponent implements AfterContentChecked {

  constructor(
    @Optional() private parent: BaseFormDirective,
  ) {
    if (parent == null) console.warn('ds-form-label must be used within a base-form')
  }

  @Input() for?: string | null = null;
  @ContentChild(FormLabelTitleDirective) titleDirective?: FormLabelTitleDirective;
  @ContentChild(FormLabelDescriptionDirective) descDirective?: FormLabelDescriptionDirective;
  @HostBinding('class.ds-form-label-1-line') hostClass1Line: boolean = false;

  ngAfterContentChecked(): void {
    this.hostClass1Line = this.titleDirective != null && this.descDirective == null;
  }
}