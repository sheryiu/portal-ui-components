import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent, ButtonModule, LayeredContainerComponent, SidebarModule } from 'portal-ui-ng';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'demo-demo-layered-layout',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
    RouterLink,
    ButtonModule,
  ],
  templateUrl: './demo-layered-layout.component.html',
  styles: ``
})
export class DemoLayeredLayoutComponent {

}
