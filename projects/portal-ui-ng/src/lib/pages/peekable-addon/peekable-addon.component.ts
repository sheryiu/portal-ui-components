import { Component, computed, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { combineLatest } from 'rxjs';
import { ButtonModule, } from '../../base';
import { TooltipModule } from '../../components';
import { PEEKABLE_ADDON_DATA_PROVIDER } from './peekable-addon';

@Component({
  selector: 'pui-peekable-addon',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    ButtonModule,
    TooltipModule,
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
