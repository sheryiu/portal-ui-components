import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { nanoid } from 'nanoid';
import { filter, map } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { ROOT_NAVIGATION_TABS } from './root-navigation';
import { SomeChildrenHaveIconPipe } from './some-children-have-icon.pipe';

@Component({
  selector: 'core-root-navigation',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
    SomeChildrenHaveIconPipe,
  ],
  templateUrl: './root-navigation.component.html',
})
export class RootNavigationComponent {

  tabs = inject(ROOT_NAVIGATION_TABS, { optional: true })?.map(t => ({
    id: nanoid(),
    ...t,
    children: t.children?.map(c => ({
      id: nanoid(),
      ...c,
    }))
  }));

  router = inject(Router);
  route = inject(ActivatedRoute);

  currentTabChildren$ = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    map(event => {
      const urls = this.tabs?.map(t => this.router.createUrlTree(t.routerLink, { relativeTo: this.route }).toString());
      const i = urls?.findIndex(url => event.url.startsWith(url));
      return (i == null ? [] : this.tabs?.at(i)?.children) ?? [];
    })
  )
}
