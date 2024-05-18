import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-component-button',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './component-button.component.html',
  styles: ``
})
export class ComponentButtonComponent {

}
