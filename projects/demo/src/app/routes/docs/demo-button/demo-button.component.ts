import { Component } from '@angular/core';
import { BreadcrumbsComponent, LayeredContainerComponent, SidebarModule } from 'phead';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'demo-demo-button',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
  ],
  templateUrl: './demo-button.component.html',
  styles: ``
})
export class DemoButtonComponent {

}
