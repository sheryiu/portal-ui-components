import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ButtonsModule } from '../../../components/atoms/buttons/buttons.module';
import { FormsModule } from '../../../components/atoms/forms/forms.module';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { RadioGroupModule } from '../../../components/molecules/radio-group/radio-group.module';
import { DropdownOptionDirective } from './dropdown-panel/dropdown-option.directive';
import { DropdownComponent } from './dropdown/dropdown.component';

@Component({
  selector: 'app-form-demo',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, ButtonsModule, FormsModule, RadioGroupModule, DropdownComponent, DropdownOptionDirective],
  templateUrl: './form-demo.component.html',
  styleUrl: './form-demo.component.css'
})
export class FormDemoComponent {

  basicInformationForm = inject(FormBuilder).nonNullable.group({
    firstName: ['John'],
    middleName: [],
    lastName: ['Appleseed'],
    gender: ['male'],
    ageGroup: [''],
  })

  addressForm = inject(FormBuilder).nonNullable.group({
    defaultAddress: inject(FormBuilder).nonNullable.group({
      line1: ['Apple Inc. 1 Apple Park Way.'],
      line2: ['Cupertino'],
      city: ['CA'],
      country: ['United States'],
    })
  })
}
