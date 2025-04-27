import { OverlayKeyboardDispatcher, OverlayRef } from '@angular/cdk/overlay';
import { Component, computed, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule, } from 'portal-ui-ng/base';
import { TooltipDirective } from 'portal-ui-ng/components';
import { combineLatest, Subject } from 'rxjs';
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
    class: 'pui-peekable-addon',
  }
})
export class PeekableAddonComponent {
  private dataProvider = inject(PEEKABLE_ADDON_DATA_PROVIDER, { optional: true });
  private route = inject(ActivatedRoute);
  private router = inject(Router)
  private overlayKeyboardDispatcher = inject(OverlayKeyboardDispatcher)

  protected routeToFullContent = computed(() => this.dataProvider?.routeToFullContent() ?? null)

  readonly _keydownEvents = new Subject<KeyboardEvent>();

  constructor() {
    combineLatest([
      this.route.params,
      this.route.queryParams,
    ]).pipe(
      takeUntilDestroyed(),
    ).subscribe(([p, qp]) => this.dataProvider?.onParamsChange?.(p, qp))

    this.overlayKeyboardDispatcher.add(this as unknown as OverlayRef)
    inject(DestroyRef).onDestroy(() => {
      this.overlayKeyboardDispatcher.ngOnDestroy();
      this._keydownEvents.complete();
    })

    this._keydownEvents.pipe(
      takeUntilDestroyed()
    ).subscribe(event => {
      if (event.key == 'Escape') {
        this.onEscapePress(event)
      }
    })
  }

  onEscapePress(event: Event) {
    if (this.route.snapshot.parent?.children.some(child => child.outlet == 'peek')) {
      this.router.navigate([{ outlets: { peek: [] } }], { relativeTo: this.route.parent })
    }
  }
}
