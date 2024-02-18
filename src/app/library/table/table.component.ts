import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, Input, NgZone, PLATFORM_ID, inject, numberAttribute } from '@angular/core';
import { ReplaySubject, animationFrameScheduler, debounceTime, distinctUntilChanged, observeOn, scheduled } from 'rxjs';

@Component({
  selector: 'core-table',
  standalone: true,
  imports: [],
  host: {
    role: 'table',
    class: 'core-table @container/table',
    ngSkipHydration: 'true',
  },
  template: `<ng-content></ng-content>`
})
export class TableComponent implements AfterViewInit {
  @Input({ transform: numberAttribute, required: true }) itemHeight!: number;
  @Input({ required: true }) columns!: string[];
  @Input({ transform: numberAttribute }) smHeight?: number;
  @Input() smColumns?: string[];
  @Input({ transform: numberAttribute }) mdHeight?: number;
  @Input() mdColumns?: string[];
  @Input({ transform: numberAttribute }) lgHeight?: number;
  @Input() lgColumns?: string[];
  @Input({ transform: numberAttribute }) xlHeight?: number;
  @Input() xlColumns?: string[];
  private _itemHeight$ = new ReplaySubject<number>(1);
  itemHeight$ = this._itemHeight$.pipe(distinctUntilChanged(), debounceTime(10), observeOn(animationFrameScheduler));
  private _columns$ = new ReplaySubject<string[]>();
  columns$ = this._columns$.pipe(distinctUntilChanged(), debounceTime(10), observeOn(animationFrameScheduler));

  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);
  private destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._itemHeight$.next(this.itemHeight);
      this._columns$.next(this.columns);
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const ro = new ResizeObserver((entries) => {
        this.zone.run(() => {
          if (entries[0].contentRect.width >= 77 * rem && this.xlHeight != null) {
            this._itemHeight$.next(this.xlHeight);
          } else if (entries[0].contentRect.width >= 61 * rem && this.lgHeight != null) {
            this._itemHeight$.next(this.lgHeight);
          } else if (entries[0].contentRect.width >= 45 * rem && this.mdHeight != null) {
            this._itemHeight$.next(this.mdHeight);
          } else if (entries[0].contentRect.width >= 37 * rem && this.smHeight != null) {
            this._itemHeight$.next(this.smHeight);
          } else {
            this._itemHeight$.next(this.itemHeight);
          }
          if (entries[0].contentRect.width >= 77 * rem && this.xlColumns != null) {
            this._columns$.next(this.xlColumns);
          } else if (entries[0].contentRect.width >= 61 * rem && this.lgColumns != null) {
            this._columns$.next(this.lgColumns);
          } else if (entries[0].contentRect.width >= 45 * rem && this.mdColumns != null) {
            this._columns$.next(this.mdColumns);
          } else if (entries[0].contentRect.width >= 37 * rem && this.smColumns != null) {
            this._columns$.next(this.smColumns);
          } else {
            this._columns$.next(this.columns);
          }
        })
      });
      ro.observe(this.elementRef.nativeElement);
      this.destroyRef.onDestroy(() => {
        ro.disconnect();
      })
    }
  }
}
