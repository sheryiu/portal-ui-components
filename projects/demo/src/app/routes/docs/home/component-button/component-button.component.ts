import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'portal-ui-ng';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-component-button',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
  ],
  templateUrl: './component-button.component.html',
  styles: ``
})
export class ComponentButtonComponent {

}
