import { animate, style, transition, trigger } from '@angular/animations';
import { DOCUMENT, NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationCancel, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filterNonNull } from 'portal-ui-ng';
import { ButtonModule, TypedTemplateDirective } from 'portal-ui-ng/base';
import { BreadcrumbsComponent, TabBarModule, TooltipDirective } from 'portal-ui-ng/components';
import { combineLatest, filter, fromEvent, map, pairwise, startWith, switchMap } from 'rxjs';
import { LayoutService } from '../layout/layout.service';
import { PeekableAddonComponent } from "../peekable-addon/peekable-addon.component";
import { VERTICAL_LAYOUT_DATA_PROVIDER } from './vertical-layout';

@Component({
  selector: 'pui-vertical-layout',
  imports: [
    RouterOutlet,
    BreadcrumbsComponent,
    ButtonModule,
    TabBarModule,
    RouterLink,
    NgTemplateOutlet,
    PeekableAddonComponent,
    TooltipDirective,
    NgClass,
    TypedTemplateDirective,
    NgTemplateOutlet
  ],
  animations: [
    trigger('floatingHeader', [
      transition(':enter', [
        style({ transform: 'translate(0, -100%)' }),
        animate('150ms ease-in-out', style({ transform: 'translate(0, 0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0, 0)' }),
        animate('150ms ease-in-out', style({ transform: 'translate(0, -100%)' }))
      ])
    ])
  ],
  providers: [LayoutService],
  templateUrl: './vertical-layout.component.html',
  styles: ``,
  host: {
    class: 'pui-vertical-layout'
  }
})
// TODO fixed header doesn't work when in peekable addon
export class VerticalLayoutComponent {
  private dataProvider = inject(VERTICAL_LAYOUT_DATA_PROVIDER)
  protected layoutService = inject(LayoutService, { self: true });
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private document = inject(DOCUMENT)

  private containerDiv = viewChild('container', { read: ElementRef })
  readonly activeTab = signal<string | null>(null)
  protected readonly heading = computed(() => this.dataProvider.heading());
  protected readonly tabs = computed(() => this.dataProvider.tabs());
  protected readonly controls = this.layoutService.controls;
  protected readonly mostEmphasizedControlId = this.layoutService.mostEmphasizedControlId;
  protected readonly scrollState = toSignal(
    toObservable(this.containerDiv).pipe(
      map(ref => (ref?.nativeElement as HTMLElement)?.closest('.pui-peekable-addon') ?? this.document),
      switchMap(target => fromEvent(target, 'scroll')),
      map(event => event.currentTarget instanceof Document ? event.currentTarget.scrollingElement?.scrollTop : (event.currentTarget as HTMLElement).scrollTop),
      filterNonNull(),
      pairwise(),
      map(([prev, curr]) => ({ direction: (curr - prev) > 0 ? 'down' : 'up', currentTop: curr })),
      takeUntilDestroyed(),
    )
  )

  constructor() {
    combineLatest([
      this.route.params,
      this.route.queryParams,
    ]).pipe(
      takeUntilDestroyed(),
    ).subscribe(([p, qp]) => this.dataProvider.onParamsChange?.(p, qp))
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd || e instanceof NavigationCancel),
      startWith(this.router.lastSuccessfulNavigation?.finalUrl),
      filterNonNull(),
      takeUntilDestroyed(),
    ).subscribe(() => {
      const tabs = this.tabs();
      if (!tabs) return;
      const activeTab = tabs.find(tab => {
        const urlTree = this.router.createUrlTree(tab.route, { relativeTo: this.route })
        return this.router.isActive(urlTree, { paths: 'subset', queryParams: 'subset', fragment: 'ignored', matrixParams: 'ignored' })
      })
      if (!activeTab) return;
      // assign a empty property so the input signal will update
      this.activeTab.set(Object.assign(activeTab.label, { [Symbol()]: null }))
      const route = this.route.routeConfig?.children?.find(child => child.path == '**');
      if (route) {
        route.redirectTo = activeTab.route
          .map(part => String(part)
            .replaceAll('..%2F', '')
            .replaceAll('.%2F', ''))
          .join('/')
      }
    })
  }

  onTabChanged(event: string) {
    const tab = this.tabs()?.find(tab => tab.label == event)
    if (tab) {
      this.router.navigate(tab.route, { relativeTo: this.route })
    }
  }
}
