import { A11yModule } from '@angular/cdk/a11y';
import { AsyncPipe, NgClass, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, effect, inject, viewChildren } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { HotkeysService } from '@ngneat/hotkeys';
import { Subject, combineLatest, debounceTime, map, startWith } from 'rxjs';
import { HardSurfaceDirective, HoverableDirective, InputFieldComponent, PheadOverlayRef } from '../../../base';
import { DividerComponent } from '../../divider';
import { GLOBAL_SEARCH_OPTION, GlobalSearchSuggestion } from '../global-search';
import { GlobalSearchService } from '../global-search.service';

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
    NgComponentOutlet,
    DividerComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './global-search-overlay.component.html',
  styles: ``
})
export class GlobalSearchComponent {
  private hotkeys = inject(HotkeysService, { optional: true });
  private overlayRef = inject(PheadOverlayRef);
  private service = inject(GlobalSearchService);
  private option = inject(GLOBAL_SEARCH_OPTION);

  private searchTerm$ = new Subject<string>();
  searchResults;

  searchResultElements = viewChildren<ElementRef<HTMLElement>>('result');
  selectedElement?: ElementRef<HTMLElement>;

  constructor() {
    if (!this.service) {
      throw new Error('Add provideGlobalSearch to your application config')
    }
    this.registerKeyboardEvents();
    this.searchResults = toSignal(combineLatest(
      this.service.suggestionsFn.map(fn => fn(this.searchTerm$).pipe(
        startWith([]),
      ))
    ).pipe(
      map(suggestions => suggestions.flat().toSorted((a, b) => a.score - b.score)),
      map(suggestions => ({
        best: suggestions.slice(0, this.option.numberOfBestResults ?? 5),
        categories: this.groupSuggestions(suggestions),
      })),
      debounceTime(0),
    ))

    effect(() => {
      this.selectedElement = this.searchResultElements().at(0);
    })
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
      this.selectedElement?.nativeElement.click();
    })
    this.hotkeys?.addShortcut({ keys: 'arrowDown', preventDefault: true, allowIn: ['INPUT'] }).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      if (this.selectedElement) {
        const currIndex = this.searchResultElements().indexOf(this.selectedElement);
        if (currIndex >= 0 && currIndex < this.searchResultElements().length - 1) {
          this.selectedElement = this.searchResultElements().at(currIndex + 1);
        } else if (currIndex == -1) {
          this.selectedElement = this.searchResultElements().at(0);
        }
      } else {
        this.selectedElement = this.searchResultElements().at(0);
      }
    })
    this.hotkeys?.addShortcut({ keys: 'arrowUp', preventDefault: true, allowIn: ['INPUT'] }).pipe(
      takeUntilDestroyed(),
    ).subscribe(() => {
      if (this.selectedElement) {
        const currIndex = this.searchResultElements().indexOf(this.selectedElement);
        if (currIndex >= 1) {
          this.selectedElement = this.searchResultElements().at(currIndex - 1);
        } else if (currIndex == -1) {
          this.selectedElement = this.searchResultElements().at(-1);
        }
      } else {
        this.selectedElement = this.searchResultElements().at(-1);
      }
    })
  }

  close() {
    this.overlayRef.close();
  }

  onSearchInput(event: Event) {
    this.searchTerm$.next((event.currentTarget as HTMLInputElement).value);
  }

  onSelectSuggestion(suggestion: GlobalSearchSuggestion) {
    const result = suggestion.onClick?.(suggestion);
    if (result instanceof Promise) {
      result.then((r) => {
        if (!!r) {
          this.overlayRef.close();
        }
      })
    } else {
      if (!!result) {
        this.overlayRef.close();
      }
    }
  }

  private groupSuggestions(suggestions: GlobalSearchSuggestion[]) {
    const groups = {} as Record<string, GlobalSearchSuggestion[]>;
    suggestions.forEach(s => {
      groups[s.category!] ??= [];
      groups[s.category!].push(s);
    });
    const rtn = {} as Record<string, { category: string; totalScore: number; list: GlobalSearchSuggestion[] }>;
    for (const key in groups) {
      if (groups[key] == null) continue;
      rtn[key] = {
        category: key,
        totalScore: groups[key]!.reduce((total, s) => total + s.score, 0) / groups[key]!.length,
        list: groups[key]!.slice(0, this.option.numberOfBestResults ?? 5),
      }
    }
    return Object.values(rtn).sort((a, b) => a.totalScore - b.totalScore)
  }
}
