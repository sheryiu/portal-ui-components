import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToggleComponent } from 'portal-ui-ng';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-component-toggle',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
    ToggleComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './component-toggle.component.html',
  styles: ``
})
export class ComponentToggleComponent {
  formControl = inject(FormBuilder).control({ value: true, disabled: false })
}
