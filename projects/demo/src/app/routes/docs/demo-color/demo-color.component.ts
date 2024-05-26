import { Component } from '@angular/core';
import { BreadcrumbsComponent, LayeredContainerComponent, SidebarModule } from 'portal-ui-ng';
import { SharedModule } from '../../../shared/shared.module';
import { ColorSetComponent } from './color-set/color-set.component';

@Component({
  selector: 'demo-demo-color',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
    ColorSetComponent,
  ],
  templateUrl: './demo-color.component.html',
  styles: ``
})
export class DemoColorComponent {

}
