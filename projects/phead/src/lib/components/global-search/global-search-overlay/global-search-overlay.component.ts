import { A11yModule } from '@angular/cdk/a11y';
import { AsyncPipe, NgClass } from '@angular/common';
import { Component, ElementRef, Injector, QueryList, ViewChildren, inject, runInInjectionContext } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HotkeysService } from '@ngneat/hotkeys';
import Fuse from 'fuse.js';
import { Subject, combineLatest, combineLatestWith, map, shareReplay } from 'rxjs';
import { HardSurfaceDirective, HoverableDirective, InputFieldComponent, OVERLAY_DATA, PheadOverlayRef, filterNonNull } from '../../../base';
import { FuseHighlightPipe } from '../fuse-highlight.pipe';
import { GlobalSearchAction } from '../global-search';
import { GlobalSearchService } from '../global-search.service';

export type GlobalSearchData = {
  originPosition: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

@Component({
  selector: 'phead-global-search-overlay',
  standalone: true,
  imports: [
    HoverableDirective,
    HardSurfaceDirective,
    InputFieldComponent,
    AsyncPipe,
    NgClass,
    A11yModule,
    RouterLink,
    FuseHighlightPipe,
  ],
  templateUrl: './global-search-overlay.component.html',
  styles: ``
})
export class GlobalSearchComponent {
  private injector = inject(Injector);
  private hotkeys = inject(HotkeysService, { optional: true });
  private overlayRef = inject(PheadOverlayRef);
  private data = inject(OVERLAY_DATA) as GlobalSearchData;
  private service = inject(GlobalSearchService, { optional: true }) as unknown as GlobalSearchService;
  originPosition = this.data.originPosition;
  rootRoute = inject(ActivatedRoute).root;

  private searchString$ = new Subject<string>();
  searchResults$;
  actions$;

  @ViewChildren('searchItem') private searchItems!: QueryList<ElementRef<HTMLElement>>;
  @ViewChildren('searchAction') private searchActions!: QueryList<ElementRef<HTMLElement>>;
  selectedElement?: HTMLElement;

  constructor() {
    if (!this.service) {
      throw new Error('Add provideGlobalSearch to your application config')
    }
    this.registerKeyboardEvents();
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

  private registerKeyboardEvents() {
    this.hotkeys?.addShortcut({ keys: 'escape', preventDefault: true, allowIn: ['INPUT'] }).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.close();
    })
    this.hotkeys?.addShortcut({ keys: 'enter', preventDefault: true, allowIn: ['INPUT'] }).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.selectedElement?.click();
    })
    this.hotkeys?.addShortcut({ keys: 'arrowDown', preventDefault: true, allowIn: ['INPUT'] }).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      if (this.selectedElement) {
        const array = this.searchItems.toArray();
        const currIndex = this.searchItems.toArray().findIndex((v) => v.nativeElement === this.selectedElement);
        if (currIndex + 1 < this.searchItems.length) {
          this.selectedElement = array[currIndex + 1].nativeElement;
        }
      } else {
        this.selectedElement = this.searchItems.first?.nativeElement;
      }
    })
    this.hotkeys?.addShortcut({ keys: 'arrowUp', preventDefault: true, allowIn: ['INPUT'] }).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      if (this.selectedElement) {
        const array = this.searchItems.toArray();
        const currIndex = this.searchItems.toArray().findIndex((v) => v.nativeElement === this.selectedElement);
        if (currIndex - 1 >= 0) {
          this.selectedElement = array[currIndex - 1].nativeElement;
        }
      } else {
        this.selectedElement = this.searchItems.last?.nativeElement;
      }
    })
  }

  close() {
    this.overlayRef.close();
  }

  onSearchInput(event: Event) {
    this.searchString$.next((event.currentTarget as HTMLInputElement).value);
    setTimeout(() => {
      this.selectedElement = this.searchItems.first?.nativeElement;
    })
  }

  onActionClick(action: GlobalSearchAction) {
    runInInjectionContext(this.injector, () => {
      action.callback();
    })
  }
}
