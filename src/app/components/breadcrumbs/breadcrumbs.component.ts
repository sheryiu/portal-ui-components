import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, ElementRef, Injector, PLATFORM_ID, ViewChild, inject } from '@angular/core';
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

  @ViewChild('breadcrumbScrollable') breadcrumbScrollable!: ElementRef<HTMLElement>;
  private ro: ResizeObserver | null = null;
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);

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

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.ro = new ResizeObserver((entries) => {
        this.detectWidth();
      })
      this.ro.observe(this.breadcrumbScrollable.nativeElement);
      this.destroyRef.onDestroy(() => {
        this.ro?.disconnect();
        this.ro = null;
      })
    }
  }

  private detectWidth() {
    if (!this.breadcrumbScrollable?.nativeElement) return;
    this.breadcrumbScrollable.nativeElement.scroll({ left: Number.MAX_SAFE_INTEGER });
  }

}
