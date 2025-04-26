import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'portal-ui-ng/base';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'pui-root-sidenav',
  imports: [
    ButtonModule,
    RouterOutlet,
  ],
  templateUrl: './root-sidenav.component.html',
  styles: ``
})
export class RootSidenavComponent {
  private router = inject(Router, { optional: true })
  isSidenavVisible = signal(false)

  constructor() {
    this.router?.events.pipe(
      filter(e => e instanceof NavigationEnd),
      debounceTime(50),
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.isSidenavVisible.set(false)
    })
  }

  toggleSidenav(value?: boolean) {
    this.isSidenavVisible.update((old) => value == null ? !old : value)
  }

  onContentClick(event: Event) {
    if (event.target == event.currentTarget) {
      this.isSidenavVisible.set(false)
    }
  }
}
