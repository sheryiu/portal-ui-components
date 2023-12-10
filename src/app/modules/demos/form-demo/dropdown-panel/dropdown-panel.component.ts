import { CommonModule } from '@angular/common';
import { Component, InjectionToken, QueryList, inject } from '@angular/core';
import { DropdownOptionDirective } from './dropdown-option.directive';

export type DropdownPanelData = {
  options: QueryList<DropdownOptionDirective>,
}
export const DROPDOWN_PANEL_DATA = new InjectionToken<DropdownPanelData>('dropdown panel data');

@Component({
  selector: 'app-dropdown-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-panel.component.html',
  styleUrl: './dropdown-panel.component.css',
  host: {
    class: 'grow'
  }
})
export class DropdownPanelComponent {
  data = inject(DROPDOWN_PANEL_DATA, { optional: true });

}
