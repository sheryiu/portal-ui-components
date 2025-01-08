import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { faker } from '@faker-js/faker';
import { ButtonModule } from 'portal-ui-ng/base';
import { DividerComponent, MenuDividerDirective, MenuGroupDirective, MenuItemDirective, TooltipModule, VerticalNavigationMenuComponent } from 'portal-ui-ng/components';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'demo-root',
  standalone: true,
  imports: [
    NgClass,
    RouterOutlet,
    ButtonModule,
    DividerComponent,
    TooltipModule,
    VerticalNavigationMenuComponent,
    MenuItemDirective,
    MenuGroupDirective,
    MenuDividerDirective
],
  templateUrl: './app.component.html',
})
export class AppComponent {
  isNavVisible = signal(false)
  private router = inject(Router)
  constructor() {
    faker.seed(2887)

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      debounceTime(150),
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.isNavVisible.set(false)
    })
  }
}
