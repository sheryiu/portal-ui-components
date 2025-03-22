import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filterNonNull } from 'portal-ui-ng';
import { ButtonModule } from 'portal-ui-ng/base';
import { BreadcrumbsComponent, TabBarModule, TooltipDirective } from 'portal-ui-ng/components';
import { combineLatest, filter, startWith } from 'rxjs';
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

  activeTab = signal<string | null>(null)
  protected heading = computed(() => this.dataProvider.heading());
  protected tabs = computed(() => this.dataProvider.tabs());
  protected controls = this.layoutService.controls;
  protected mostEmphasizedControlId = this.layoutService.mostEmphasizedControlId;

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
