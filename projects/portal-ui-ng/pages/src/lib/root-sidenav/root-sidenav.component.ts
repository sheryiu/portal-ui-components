import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'portal-ui-ng/base';

@Component({
  selector: 'pui-root-sidenav',
  standalone: true,
  imports: [
    ButtonModule,
    RouterOutlet,
  ],
  templateUrl: './root-sidenav.component.html',
  styles: ``
})
export class RootSidenavComponent {
  isSidenavVisible = signal(false)

  toggleSidenav(value?: boolean) {
    this.isSidenavVisible.update((old) => value == null ? !old : value)
  }
}
