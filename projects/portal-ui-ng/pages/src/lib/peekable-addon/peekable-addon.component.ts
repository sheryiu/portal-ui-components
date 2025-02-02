import { Component, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule, } from 'portal-ui-ng/base';
import { TooltipDirective } from 'portal-ui-ng/components';
import { combineLatest } from 'rxjs';
import { PEEKABLE_ADDON_DATA_PROVIDER } from './peekable-addon';

@Component({
  selector: 'pui-peekable-addon',
  imports: [
    RouterOutlet,
    RouterLink,
    ButtonModule,
    TooltipDirective,
  ],
  templateUrl: './peekable-addon.component.html',
  styles: ``,
  host: {
    class: 'pui-peekable-addon'
  }
})
export class PeekableAddonComponent {
  private dataProvider = inject(PEEKABLE_ADDON_DATA_PROVIDER, { optional: true });
  private route = inject(ActivatedRoute);

  protected routeToFullContent = computed(() => this.dataProvider?.routeToFullContent() ?? null)

  constructor() {
    combineLatest([
      this.route.params,
      this.route.queryParams,
    ]).pipe(
      takeUntilDestroyed(),
    ).subscribe(([p, qp]) => this.dataProvider?.onParamsChange?.(p, qp))
  }
}
