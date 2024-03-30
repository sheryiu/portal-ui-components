import { A11yModule } from '@angular/cdk/a11y';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HotkeysService } from '@ngneat/hotkeys';
import Fuse from 'fuse.js';
import { Subject, combineLatest, combineLatestWith, first, map, of, shareReplay, withLatestFrom } from 'rxjs';
import { OVERLAY_DATA } from '../../components/overlay/overlay';
import { OverlayRefExtra } from '../../components/overlay/overlay-ref-extra';
import { filterNonNull } from '../../components/utils/filter-non-null';
import { SharedModule } from '../../shared/shared.module';
import { ArmorService } from '../../store/armor.service';
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
  ],
  templateUrl: './global-search.component.html',
  styles: ``
})
export class GlobalSearchComponent {
  private hotkeys = inject(HotkeysService);
  private overlayRef = inject(OverlayRefExtra);
  private data = inject(OVERLAY_DATA) as GlobalSearchData;
  private service = inject(GlobalSearchService, { optional: true }) as unknown as GlobalSearchService;
  originPosition = this.data.originPosition;

  private searchString$ = new Subject<string>();
  searchResults$;

  constructor() {
    if (!this.service) {
      throw new Error('Add provideGlobalSearch to your application config')
    }
    this.hotkeys.addShortcut({ keys: 'escape', preventDefault: true }).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.close();
    })
    const suggestion = inject(ArmorService).list().pipe(
      map(d => d?.map(d => ({
        title: d.name.en + '/' + d.name.jp
      }))),
    )
    const suggestionNonNull = suggestion.pipe(
      first((data): data is { title: string; }[] => data != null),
    )
    const suggestion$ = combineLatest([
      suggestionNonNull
    ]).pipe(
      map(([suggestion]) => {
        const fuse = new Fuse(suggestion, {
          ignoreLocation: true,
          includeMatches: true,
          keys: [
            'title'
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
  }

  close() {
    this.overlayRef.close();
  }

  onSearchInput(event: Event) {
    this.searchString$.next((event.currentTarget as HTMLInputElement).value)
  }
}
