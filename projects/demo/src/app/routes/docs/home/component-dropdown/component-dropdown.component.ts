import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownModule } from 'portal-ui-ng';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-component-dropdown',
  standalone: true,
  imports: [
    SharedModule,
    DropdownModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './component-dropdown.component.html',
  styles: ``
})
export class ComponentDropdownComponent {

}
