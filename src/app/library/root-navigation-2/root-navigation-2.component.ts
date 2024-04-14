import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { nanoid } from 'nanoid';
import { SharedModule } from '../../shared/shared.module';
import { GlobalSearchModule } from '../global-search/global-search.module';
import { ROOT_NAVIGATION_TABS } from '../root-navigation/root-navigation';

@Component({
  selector: 'core-root-navigation-2',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
    GlobalSearchModule,
  ],
  templateUrl: './root-navigation-2.component.html',
  host: {
    class: 'core-root-navigation-2'
  }
})
export class RootNavigation2Component {

  tabs = inject(ROOT_NAVIGATION_TABS, { optional: true })?.map(t => ({
    id: nanoid(),
    ...t,
  }));

}
