import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsComponent, InputFieldComponent, LayeredContainerComponent, SidebarModule, ToggleComponent } from 'portal-ui-ng';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'demo-demo-toggle',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
    ToggleComponent,
    InputFieldComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './demo-toggle.component.html',
  styles: ``
})
export class DemoToggleComponent {
  disabledControl = inject(FormBuilder).control({ value: false, disabled: true });
}
