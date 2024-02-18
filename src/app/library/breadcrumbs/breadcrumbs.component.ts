import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatestAll, from, isObservable, map, of, switchMap } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { getBreadcrumb } from './breadcrumbs';

@Component({
  selector: 'core-breadcrumbs',
  standalone: true,
  host: {
    class: 'core-breadcrumbs',
  },
  imports: [
    SharedModule,
    RouterLink,
  ],
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent {

  breadcrumbs$;

  constructor() {
    const route = inject(ActivatedRoute);
    const breadcrumbs = [];
    let parent: ActivatedRoute | null = route;
    while (parent) {
      const data = parent.routeConfig?.data;
      if (data) {
        const breadcrumb = getBreadcrumb(data);
        if (breadcrumb) {
          breadcrumbs.unshift({
            ...breadcrumb,
            injectedDeps: ('deps' in breadcrumb) ? breadcrumb.deps?.map(d => inject(d)) : [],
            route: parent,
          });
        }
      }
      parent = parent.parent;
    }
    this.breadcrumbs$ = of(breadcrumbs).pipe(
      map((breadcrumbs) =>
        breadcrumbs.map((b) => {
          if ('titleFn' in b) {
            const temp = b.titleFn(route, ...b.injectedDeps ?? []);
            if (isObservable(temp)) return temp.pipe(
              map(title => ({ ...b, title }))
            )
            return of({
              ...b, title: temp,
            });
          } else {
            return of({
              ...b,
            });
          }
        })
      ),
      switchMap(b => from(b).pipe(
        combineLatestAll(),
      )),
    )
  }

}
