import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TabBarModule } from 'phead';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-component-tab-bar',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
    TabBarModule,
  ],
  templateUrl: './component-tab-bar.component.html',
  styles: ``
})
export class ComponentTabBarComponent {

}
