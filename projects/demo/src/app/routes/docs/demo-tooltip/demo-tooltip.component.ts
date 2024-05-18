import { Component } from '@angular/core';
import { BreadcrumbsComponent, LayeredContainerComponent, SidebarModule } from 'phead';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'demo-demo-tooltip',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
  ],
  templateUrl: './demo-tooltip.component.html',
  styles: ``
})
export class DemoTooltipComponent {

}
