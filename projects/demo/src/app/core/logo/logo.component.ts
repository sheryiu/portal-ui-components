import { Component } from '@angular/core';
import { GlobalSearchModule, HoverableDirective } from 'portal-ui-ng';

@Component({
  selector: 'demo-logo',
  standalone: true,
  imports: [HoverableDirective, GlobalSearchModule],
  templateUrl: './logo.component.html',
})
export class LogoComponent {

}
