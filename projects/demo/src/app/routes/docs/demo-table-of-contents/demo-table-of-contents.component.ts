import { Component } from '@angular/core';
import { ArrayPipe, BreadcrumbsComponent, LayeredContainerComponent, ScrollspyModule, SidebarModule, TableOfContentsModule } from 'phead';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'demo-demo-table-of-contents',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
    ScrollspyModule,
    TableOfContentsModule,
    ArrayPipe,
  ],
  templateUrl: './demo-table-of-contents.component.html',
  styles: ``
})
export class DemoTableOfContentsComponent {

}
