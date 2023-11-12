import {
  Injectable,
  InjectionToken,
  Optional,
  SkipSelf,
  inject,
  makeEnvironmentProviders,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatAll, map, mergeMap, of, toArray } from 'rxjs';

export type Breadcrumb = {
  id: string;
  title?: string;
  title$?: Observable<string>;
  icon?: string;
};

type ActualBreadcrumb = Breadcrumb & { route: ActivatedRoute };

const BREADCRUMB = new InjectionToken<ActualBreadcrumb[]>('breadcrumb');

@Injectable({
  providedIn: 'any',
})
export class BreadcrumbsService {
  private breadcrumbs = inject(BREADCRUMB, { optional: true });
  breadcrumbs$ = of(this.breadcrumbs).pipe(
    map((breadcrumbs) => breadcrumbs?.flat(Infinity) ?? []),
    map((breadcrumbs) =>
      breadcrumbs.map((b) =>
        b.title$ != null
          ? b.title$!.pipe(
              map(
                (title) => ({ ...b, title } as Omit<ActualBreadcrumb, 'title$'>)
              )
            )
          : of(b as Omit<ActualBreadcrumb, 'title$'>)
      )
    ),
    mergeMap((b) => b),
    concatAll(),
    toArray()
  );
}

export function provideBreadcrumb(breadcrumb: Breadcrumb) {
  return makeEnvironmentProviders([
    {
      provide: BREADCRUMB,
      deps: [[new SkipSelf(), new Optional(), BREADCRUMB], ActivatedRoute],
      useFactory: (
        otherBreadcrumbs: ActualBreadcrumb[],
        activatedRoute: ActivatedRoute
      ) =>
        (otherBreadcrumbs ?? []).concat([
          {
            ...breadcrumb,
            route: activatedRoute,
          },
        ]),
      multi: true,
    },
  ]);
}
