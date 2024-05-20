import { Component } from '@angular/core';
import { HoverableDirective, LayeredContainerComponent, ScrollspyModule, SidebarModule, TableOfContentsModule } from 'phead';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentButtonComponent } from './component-button/component-button.component';
import { ComponentDialogComponent } from './component-dialog/component-dialog.component';
import { ComponentDropdownComponent } from './component-dropdown/component-dropdown.component';
import { ComponentFieldComponent } from './component-field/component-field.component';
import { ComponentSegmentedOptionsComponent } from './component-segmented-options/component-segmented-options.component';
import { ComponentTabBarComponent } from './component-tab-bar/component-tab-bar.component';
import { ComponentTableOfContentsComponent } from './component-table-of-contents/component-table-of-contents.component';
import { ComponentTableComponent } from './component-table/component-table.component';
import { ComponentToggleComponent } from './component-toggle/component-toggle.component';
import { ComponentTooltipComponent } from './component-tooltip/component-tooltip.component';
import { LayoutLayeredComponent } from './layout-layered/layout-layered.component';
import { LayoutSidebarComponent } from './layout-sidebar/layout-sidebar.component';
import { SystemAccordionComponent } from './system-accordion/system-accordion.component';
import { SystemColorComponent } from './system-color/system-color.component';
import { SystemScrollspyComponent } from './system-scrollspy/system-scrollspy.component';

@Component({
  selector: 'demo-home',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    HoverableDirective,
    ScrollspyModule,
    TableOfContentsModule,

    ComponentFieldComponent,
    ComponentButtonComponent,
    SystemAccordionComponent,
    ComponentTooltipComponent,
    ComponentDropdownComponent,
    ComponentSegmentedOptionsComponent,
    ComponentTableComponent,
    LayoutLayeredComponent,
    LayoutSidebarComponent,
    ComponentDialogComponent,
    ComponentTableOfContentsComponent,
    SystemScrollspyComponent,
    ComponentToggleComponent,
    ComponentTabBarComponent,
    SystemColorComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
