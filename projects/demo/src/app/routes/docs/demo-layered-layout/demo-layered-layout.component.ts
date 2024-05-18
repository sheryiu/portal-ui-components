import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbsComponent, LayeredContainerComponent, SidebarModule } from 'phead';
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
  ],
  templateUrl: './demo-layered-layout.component.html',
  styles: ``
})
export class DemoLayeredLayoutComponent {

}
