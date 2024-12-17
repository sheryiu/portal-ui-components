import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { faker } from '@faker-js/faker';
import { ButtonModule, DividerComponent, MenuDividerDirective, MenuGroupDirective, MenuItemDirective, TooltipModule, VerticalNavigationMenuComponent } from 'portal-ui-ng';

@Component({
  selector: 'demo-root',
  standalone: true,
  imports: [
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
  constructor() {
    faker.seed(2887)
  }
}
