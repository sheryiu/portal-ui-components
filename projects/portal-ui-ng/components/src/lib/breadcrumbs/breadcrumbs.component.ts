import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HoverableDirective } from 'portal-ui-ng/base';
import { combineLatest, combineLatestAll, from, isObservable, map, of, switchMap } from 'rxjs';
import { TooltipDirective } from '../tooltip';
import { getBreadcrumb } from './breadcrumbs';

@Component({
  selector: 'pui-breadcrumbs',
  host: {
    class: 'pui-breadcrumbs',
  },
  imports: [
    AsyncPipe,
    RouterLink,
    HoverableDirective,
    TooltipDirective,
  ],
  templateUrl: './breadcrumbs.component.html'
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
          if ('deps' in b || 'titleFn' in b) {
            let tempTitle = b.titleFn(route, ...b.injectedDeps ?? []);
            let tempTooltip = b.tooltipFn?.(route, ...b.injectedDeps ?? []);
            if (!isObservable(tempTitle)) tempTitle = of(tempTitle);
            if (tempTooltip && !isObservable(tempTooltip)) tempTooltip = of(tempTooltip);
            return combineLatest([
              tempTitle,
              tempTooltip ?? of(null),
            ]).pipe(
              map(([title, tooltip]) => ({ ...b, title, tooltip }))
            )
          } else {
            return of({
              ...b as {
                route: ActivatedRoute;
                title: string;
                tooltip?: string | null;
                id: Symbol;
              },
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
