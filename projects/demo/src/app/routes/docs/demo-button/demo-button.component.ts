import { Component } from '@angular/core';
import { BreadcrumbsComponent, ButtonModule, LayeredContainerComponent, SidebarModule } from 'portal-ui-ng';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'demo-demo-button',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
    ButtonModule,
  ],
  templateUrl: './demo-button.component.html',
  styles: ``
})
export class DemoButtonComponent {

}
