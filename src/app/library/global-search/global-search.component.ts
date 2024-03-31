import { A11yModule } from '@angular/cdk/a11y';
import { Component, Injector, inject, runInInjectionContext } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HotkeysService } from '@ngneat/hotkeys';
import Fuse from 'fuse.js';
import { Subject, combineLatest, combineLatestWith, map, shareReplay } from 'rxjs';
import { OVERLAY_DATA } from '../../components/overlay/overlay';
import { OverlayRefExtra } from '../../components/overlay/overlay-ref-extra';
import { filterNonNull } from '../../components/utils/filter-non-null';
import { SharedModule } from '../../shared/shared.module';
import { GlobalSearchAction } from './global-search';
import { GlobalSearchService } from './global-search.service';

export type GlobalSearchData = {
  originPosition: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

@Component({
  selector: 'core-global-search',
  standalone: true,
  imports: [
    SharedModule,
    A11yModule,
    RouterLink,
  ],
  templateUrl: './global-search.component.html',
  styles: ``
})
export class GlobalSearchComponent {
  private injector = inject(Injector);
  private hotkeys = inject(HotkeysService);
  private overlayRef = inject(OverlayRefExtra);
  private data = inject(OVERLAY_DATA) as GlobalSearchData;
  private service = inject(GlobalSearchService, { optional: true }) as unknown as GlobalSearchService;
  originPosition = this.data.originPosition;
  rootRoute = inject(ActivatedRoute).root;

  private searchString$ = new Subject<string>();
  searchResults$;
  actions$;

  constructor() {
    if (!this.service) {
      throw new Error('Add provideGlobalSearch to your application config')
    }
    this.hotkeys.addShortcut({ keys: 'escape', preventDefault: true, allowIn: ['INPUT'] }).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.close();
    })
    const suggestion$ = combineLatest(
      this.service.suggestionProviders
    ).pipe(
      map(suggestions => suggestions.flat()),
      map((suggestions) => {
        const fuse = new Fuse(suggestions, {
          ignoreLocation: true,
          includeMatches: true,
          keys: [
            'title',
            'description',
          ]
        });
        return fuse;
      }),
      filterNonNull(),
      shareReplay(1),
    )
    this.searchResults$ = this.searchString$.pipe(
      combineLatestWith(suggestion$),
      map(([string, fuse]) => fuse.search(string)),
    )
    const actionsFuse = new Fuse(this.service.actions, {
      ignoreLocation: true,
      includeMatches: true,
      keys: [
        'title',
      ]
    });
    this.actions$ = this.searchString$.pipe(
      map(string => actionsFuse.search(string)),
    )
  }

  close() {
    this.overlayRef.close();
  }

  onSearchInput(event: Event) {
    this.searchString$.next((event.currentTarget as HTMLInputElement).value)
  }

  onActionClick(action: GlobalSearchAction) {
    runInInjectionContext(this.injector, () => {
      action.callback();
    })
  }
}
