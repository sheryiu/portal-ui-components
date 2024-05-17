import { Component } from '@angular/core';
import { HoverableDirective, LayeredContainerComponent, SidebarModule } from 'phead';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentButtonComponent } from './component-button/component-button.component';
import { ComponentDropdownComponent } from './component-dropdown/component-dropdown.component';
import { ComponentFieldComponent } from './component-field/component-field.component';
import { ComponentSegmentedOptionsComponent } from './component-segmented-options/component-segmented-options.component';
import { ComponentTableComponent } from './component-table/component-table.component';
import { ComponentTooltipComponent } from './component-tooltip/component-tooltip.component';
import { SystemAccordionComponent } from './system-accordion/system-accordion.component';

@Component({
  selector: 'demo-home',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    HoverableDirective,

    ComponentFieldComponent,
    ComponentButtonComponent,
    SystemAccordionComponent,
    ComponentTooltipComponent,
    ComponentDropdownComponent,
    ComponentSegmentedOptionsComponent,
    ComponentTableComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
