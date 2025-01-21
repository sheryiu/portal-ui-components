import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { faker } from '@faker-js/faker';
import { ButtonModule } from 'portal-ui-ng/base';
import { DividerComponent, MenuDividerDirective, MenuGroupDirective, MenuItemDirective, TooltipDirective, VerticalNavigationMenuComponent } from 'portal-ui-ng/components';
import { RootSidenavComponent } from 'portal-ui-ng/pages';
import { debounceTime, filter } from 'rxjs';

@Component({
  selector: 'demo-root',
  standalone: true,
  imports: [
    ButtonModule,
    DividerComponent,
    TooltipDirective,
    VerticalNavigationMenuComponent,
    MenuItemDirective,
    MenuGroupDirective,
    MenuDividerDirective,
    RootSidenavComponent,
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
