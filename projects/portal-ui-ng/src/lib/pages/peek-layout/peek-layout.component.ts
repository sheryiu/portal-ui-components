import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule, } from '../../base';
import { TooltipModule } from '../../components';

@Component({
  selector: 'pui-peek-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ButtonModule,
    TooltipModule,
  ],
  templateUrl: './peek-layout.component.html',
  styles: ``,
  host: {
    class: 'pui-peek-layout'
  }
})
export class PeekLayoutComponent {

}
