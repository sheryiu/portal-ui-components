import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-system-color',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './system-color.component.html',
  styles: ``
})
export class SystemColorComponent {

}
