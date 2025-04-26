import { animate, style, transition, trigger } from '@angular/animations';
import { DOCUMENT, NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filterNonNull } from 'portal-ui-ng';
import { ButtonModule, TypedTemplateDirective } from 'portal-ui-ng/base';
import { BreadcrumbsComponent, TabBarModule, TooltipDirective } from 'portal-ui-ng/components';
import { combineLatest, filter, fromEvent, map, pairwise, startWith } from 'rxjs';
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
        animate('200ms ease-in-out', style({ transform: 'translate(0, 0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0, 0)' }),
        animate('200ms ease-in-out', style({ transform: 'translate(0, -100%)' }))
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
export class VerticalLayoutComponent {
  private dataProvider = inject(VERTICAL_LAYOUT_DATA_PROVIDER)
  protected layoutService = inject(LayoutService, { self: true });
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private document = inject(DOCUMENT)

  readonly activeTab = signal<string | null>(null)
  protected readonly heading = computed(() => this.dataProvider.heading());
  protected readonly tabs = computed(() => this.dataProvider.tabs());
  protected readonly controls = this.layoutService.controls;
  protected readonly mostEmphasizedControlId = this.layoutService.mostEmphasizedControlId;
  protected readonly scrollState = toSignal(fromEvent(this.document, 'scroll').pipe(
    map(event => (event.currentTarget as Document).scrollingElement?.scrollTop),
    filterNonNull(),
    pairwise(),
    map(([prev, curr]) => ({ direction: (curr - prev) > 0 ? 'down' : 'up', currentTop: curr })),
    takeUntilDestroyed(),
  ))

  constructor() {
    combineLatest([
      this.route.params,
      this.route.queryParams,
    ]).pipe(
      takeUntilDestroyed(),
    ).subscribe(([p, qp]) => this.dataProvider.onParamsChange?.(p, qp))
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
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
      this.activeTab.set(activeTab.label)
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
