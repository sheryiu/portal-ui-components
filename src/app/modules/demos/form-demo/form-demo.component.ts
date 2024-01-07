import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ButtonsModule } from '../../../components/atoms/buttons/buttons.module';
import { FormsLayoutModule } from '../../../components/atoms/forms-layout/forms-layout.module';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { DropdownModule } from '../../../components/molecules/dropdown/dropdown.module';
import { RadioGroupModule } from '../../../components/molecules/radio-group/radio-group.module';
import { ToolbarModule } from '../../../components/molecules/toolbar/toolbar.module';

@Component({
  selector: 'app-form-demo',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumbsComponent,
    ButtonsModule,
    FormsLayoutModule,
    RadioGroupModule,
    ToolbarModule,
    DropdownModule,
  ],
  templateUrl: './form-demo.component.html',
  styleUrl: './form-demo.component.css',
})
export class FormDemoComponent {
  basicInformationForm = inject(FormBuilder).nonNullable.group({
    firstName: ['John'],
    middleName: [],
    lastName: ['Appleseed'],
    gender: ['male'],
    ageGroup: ['lt18'],
  });

  addressForm = inject(FormBuilder).nonNullable.group({
    defaultAddress: inject(FormBuilder).nonNullable.group({
      line1: ['Apple Inc. 1 Apple Park Way.'],
      line2: ['Cupertino'],
      city: ['CA'],
      country: ['United States'],
    }),
  });

  recentHistory = {
    timestamp: new Date('2024-01-01 07:59:00'),
    message: 'Added $200 to Account'
  }

  onCancel() {
    this.addressForm.reset();
    this.basicInformationForm.reset();
  }
}
