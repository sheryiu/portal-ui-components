import { Component } from '@angular/core';
import { BreadcrumbsComponent, FieldModule, LayeredContainerComponent, SidebarModule } from 'phead';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'demo-demo-field',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
    FieldModule,
  ],
  templateUrl: './demo-field.component.html',
  styles: ``
})
export class DemoFieldComponent {

}
