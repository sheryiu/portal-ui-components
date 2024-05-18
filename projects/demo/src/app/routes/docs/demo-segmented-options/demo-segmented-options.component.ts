import { Component } from '@angular/core';
import { BreadcrumbsComponent, LayeredContainerComponent, SegmentedOptionsModule, SidebarModule } from 'phead';
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
