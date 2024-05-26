import { Component } from '@angular/core';
import { BreadcrumbsComponent, LayeredContainerComponent, SegmentedOptionsModule, SidebarModule } from 'portal-ui-ng';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'demo-demo-segmented-options',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
    SegmentedOptionsModule,
  ],
  templateUrl: './demo-segmented-options.component.html',
  styles: ``
})
export class DemoSegmentedOptionsComponent {

}
