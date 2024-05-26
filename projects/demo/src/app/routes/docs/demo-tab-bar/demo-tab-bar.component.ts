import { Component } from '@angular/core';
import { BreadcrumbsComponent, LayeredContainerComponent, ScrollspyModule, SidebarModule, TabBarModule } from 'portal-ui-ng';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'demo-demo-tab-bar',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
    TabBarModule,
    ScrollspyModule,
  ],
  templateUrl: './demo-tab-bar.component.html',
  styles: ``
})
export class DemoTabBarComponent {

}
