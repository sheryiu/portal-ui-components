import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HotkeysService } from '@ngneat/hotkeys';
import { Observable } from 'rxjs';
import { PuiOverlayRef, PuiOverlayService } from '../../base';
import { GLOBAL_SEARCH_OPTION, GLOBAL_SEARCH_PROVIDERS, GLOBAL_SEARCH_PROVIDER_FNS } from './global-search';
import { GlobalSearchComponent } from './global-search-overlay/global-search-overlay.component';

@Injectable()
export class GlobalSearchService {
  private option = inject(GLOBAL_SEARCH_OPTION);
  private providers = inject(GLOBAL_SEARCH_PROVIDERS, { optional: true }) ?? [];
  private providerFns = inject(GLOBAL_SEARCH_PROVIDER_FNS, { optional: true }) ?? [];
  private hotKeys = inject(HotkeysService, { optional: true });
  private overlay = inject(PuiOverlayService, { optional: true });
  private overlayRef?: PuiOverlayRef;

  suggestionsFn;

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      if (this.overlay == null) {
        throw new Error('Global Search UI requires PuiOverlayService, please provide the overlay service in your application config')
      }
      this.hotKeys?.addShortcut({
        keys: this.option.hotkey ?? 'control.k',
        preventDefault: true
      }).pipe(
        takeUntilDestroyed(),
      ).subscribe(() => {
        this.openOverlay();
      })
    }
    this.suggestionsFn = this.providers.map(provider => {
      return (searchTerm$: Observable<string>) => inject(provider).getSuggestions(searchTerm$)
    }).concat(this.providerFns.map(fn => {
      return fn;
    }))
  }

  openOverlay() {
    if (this.overlayRef) return;
    this.overlayRef = this.overlay?.open(
      GlobalSearchComponent,
      {
        positionStrategy: this.overlay.position().global()
          .centerHorizontally()
          .top('10svh'),
        minWidth: this.option.minWidth ?? '480px',
        width: this.option.width ?? '50svw',
        scrollStrategy: this.overlay.scrollStrategies.noop(),
        disposeOnNavigation: true,
        backdropClass: 'pui-global-search-backdrop',
        hasBackdrop: true,
        closeOnBackdropClick: true,
      }
    )
    this.overlayRef?.afterClosed$.subscribe(() => {
      this.overlayRef = undefined;
    })
  }

  closeOverlay() {
    this.overlayRef?.close();
  }
}
