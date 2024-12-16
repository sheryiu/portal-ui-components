import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { faker } from '@faker-js/faker/locale/base';
import { ButtonModule, DividerComponent, MenuDividerDirective, MenuGroupDirective, MenuItemDirective, TabBarModule, TableModule, TooltipModule, VerticalNavigationMenuComponent } from 'portal-ui-ng';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'demo-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SharedModule,
    TabBarModule,
    ButtonModule,
    TableModule,
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
