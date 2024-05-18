import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-layout-layered',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './layout-layered.component.html',
  styles: ``
})
export class LayoutLayeredComponent {

}
