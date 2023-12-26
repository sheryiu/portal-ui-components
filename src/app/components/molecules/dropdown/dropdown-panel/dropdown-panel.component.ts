import { CommonModule } from '@angular/common';
import { Component, InjectionToken, QueryList, inject } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '../../../atoms/buttons/buttons.module';
import { DropdownOptionDirective } from './dropdown-option.directive';

export type DropdownPanelData = {
  options: QueryList<DropdownOptionDirective>;
  formGroup: FormGroup<{}>;
  formControlName: string;
  onChange: () => void;
};
export const DROPDOWN_PANEL_DATA = new InjectionToken<DropdownPanelData>(
  'dropdown panel data'
);

@Component({
  selector: 'app-dropdown-panel',
  standalone: true,
  imports: [CommonModule, ButtonsModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dropdown-panel.component.html',
  host: {
    class: 'ds-dropdown-panel',
  },
})
export class DropdownPanelComponent {
  data = inject(DROPDOWN_PANEL_DATA, { optional: true });
  formGroup = this.data?.formGroup;
  formControlName = this.data?.formControlName;
}
