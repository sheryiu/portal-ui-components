import { CommonModule } from '@angular/common';
import { Component, Injector, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, concatAll, isObservable, map, mergeMap, of, toArray } from 'rxjs';
import { ButtonsModule } from '../atoms/buttons/buttons.module';
import { Breadcrumb, getBreadcrumb } from './breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, ButtonsModule, RouterLink, RouterLinkActive],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css',
})
export class BreadcrumbsComponent {

  breadcrumbs$!: Observable<(Breadcrumb & { route: ActivatedRoute })[]>;

  constructor() {
    const breadcrumbs = [];
    const route = inject(ActivatedRoute);
    let parent: ActivatedRoute | null = route;
    while (parent) {
      const data = parent.routeConfig?.data;
      const breadcrumb = getBreadcrumb(data);
      if (breadcrumb) {
        breadcrumbs.unshift({
          ...breadcrumb,
          route: parent,
        });
      }
      parent = parent.parent;
    }
    this.breadcrumbs$ = of(breadcrumbs).pipe(
      map((breadcrumbs) =>
        breadcrumbs.map((b) => {
          if (b.titleFn != null) {
            const temp = b.titleFn();
            if (isObservable(temp)) return temp.pipe(
              map(title => ({ ...b, title }))
            )
            return of({
              ...b, title: temp,
            });
          }
          return of(b);
        })
      ),
      mergeMap((b) => b),
      concatAll(),
      toArray()
    )
  }

}
