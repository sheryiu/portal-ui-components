import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';
import { ButtonModule } from 'portal-ui-ng/base';
import { DividerComponent, MenuDividerDirective, MenuGroupDirective, MenuItemDirective, TooltipDirective, VerticalNavigationMenuComponent } from 'portal-ui-ng/components';
import { RootSidenavComponent } from 'portal-ui-ng/pages';

@Component({
  selector: 'demo-root',
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
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor() {
    faker.seed(2887)
  }
}
