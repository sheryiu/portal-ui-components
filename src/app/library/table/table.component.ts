import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, HostBinding, Input, NgZone, OnDestroy, PLATFORM_ID, inject, numberAttribute } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'core-table',
  standalone: true,
  imports: [],
  host: {
    role: 'table',
    class: 'core-table @container/table',
  },
  template: `<ng-content></ng-content>`
})
export class TableComponent implements AfterViewInit, OnDestroy {
  @Input({ transform: numberAttribute, required: true }) itemHeight!: number;
  @Input({ required: true }) columns!: string[];
  @Input() columnWidths?: string[];
  @Input({ transform: numberAttribute }) smHeight?: number;
  @Input() smColumns?: string[];
  @Input() smColumnWidths?: string[];
  @Input({ transform: numberAttribute }) mdHeight?: number;
  @Input() mdColumns?: string[];
  @Input() mdColumnWidths?: string[];
  @Input({ transform: numberAttribute }) lgHeight?: number;
  @Input() lgColumns?: string[];
  @Input() lgColumnWidths?: string[];
  @Input({ transform: numberAttribute }) xlHeight?: number;
  @Input() xlColumns?: string[];
  @Input() xlColumnWidths?: string[];
  // container width is larger than ...
  private _activeResponsiveSize: 'null' | 'sm' | 'md' | 'lg' | 'xl' = 'null';
  /**
   * Subscribe to responsiveUpdated$ to get updates
   */
  get activeColumns(): string[] | undefined {
    const sizes = ['xl', 'lg', 'md', 'sm', 'null'];
    const curr = sizes.indexOf(this._activeResponsiveSize);
    const columns = [this.xlColumns, this.lgColumns, this.mdColumns, this.smColumns, this.columns];
    return columns.find((c, i): c is string[] => i >= curr && c != null) ?? this.columns;
  }
  /**
   * Subscribe to responsiveUpdated$ to get updates
   */
  get activeColumnWidths(): string[] | undefined {
    const sizes = ['xl', 'lg', 'md', 'sm', 'null'];
    const curr = sizes.indexOf(this._activeResponsiveSize);
    const columns = [this.xlColumnWidths, this.lgColumnWidths, this.mdColumnWidths, this.smColumnWidths, this.columnWidths];
    // TODO might need to change default from other values to prevent auto adjusting size
    return columns.find((c, i): c is string[] => i >= curr && c != null) ?? this.columnWidths ?? [...this.activeColumns ?? []].fill('1fr');
  }
  /**
   * Subscribe to responsiveUpdated$ to get updates
   */
  get activeItemHeight(): number | undefined {
    const sizes = ['xl', 'lg', 'md', 'sm', 'null'];
    const curr = sizes.indexOf(this._activeResponsiveSize);
    const columns = [this.xlHeight, this.lgHeight, this.mdHeight, this.smHeight, this.itemHeight];
    return columns.find((c, i): c is number => i >= curr && c != null) ?? this.itemHeight;
  }
  responsiveUpdated$ = new Subject<void>();
  @HostBinding('style.--core-table-columns') private hostColumnWidths: string | undefined = undefined;

  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);
  private destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const ro = new ResizeObserver((entries) => {
        this.zone.run(() => {
          const { width } = entries[0].contentRect;
          const newSize: TableComponent['_activeResponsiveSize'] = (width >= 77 * rem) ? 'xl' :
            (width >= 61 * rem) ? 'lg' :
            (width >= 45 * rem) ? 'md' :
            (width >= 37 * rem) ? 'sm' :
            'null';
          if (newSize != this._activeResponsiveSize) {
            this._activeResponsiveSize = newSize;
            this.hostColumnWidths = this.activeColumnWidths?.join(' ');
            this.responsiveUpdated$.next();
          }
        })
      });
      ro.observe(this.elementRef.nativeElement);
      this.destroyRef.onDestroy(() => {
        ro.disconnect();
      })
    }
  }

  ngOnDestroy(): void {
    this.responsiveUpdated$.complete();
  }
}