import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TableOfContentsModule } from 'portal-ui-ng';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-component-table-of-contents',
  standalone: true,
  imports: [
    SharedModule,
    TableOfContentsModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './component-table-of-contents.component.html',
  styles: ``
})
export class ComponentTableOfContentsComponent {

}
