import { AfterViewInit, ChangeDetectorRef, Component, ContentChildren, QueryList, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
  selector: 'core-form-fieldset',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './form-fieldset.component.html',
})
export class FormFieldsetComponent implements AfterViewInit {
  @ContentChildren(FormFieldComponent) formFields!: QueryList<FormFieldComponent>;
  private cdr = inject(ChangeDetectorRef);
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

}
