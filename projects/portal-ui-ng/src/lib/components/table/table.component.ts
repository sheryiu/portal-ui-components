import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, ElementRef, HostBinding, Injector, Input, NgZone, PLATFORM_ID, afterNextRender, booleanAttribute, computed, contentChildren, effect, inject, input, signal } from '@angular/core';
import { TableCellDefDirective } from './table-cell/table-cell-def.directive';
import { TableHeaderCellDefDirective } from './table-header-cell/table-header-cell-def.directive';

@Component({
  selector: 'pui-table',
  standalone: true,
  imports: [],
  host: {
    role: 'table',
    class: 'pui-table @container/table',
  },
  template: `<ng-content></ng-content>`
})
export class TableComponent {
  itemHeight = input.required<Record<'default' | `${number}px` | number, number> | number>();
  columns = input.required<Record<'default' | `${number}px` | number, string[]> | string[]>();
  columnWidths = input<Record<'default' | `${number}px` | number, string[]> | string[]>();
  private currentWidth = signal<number | undefined>(undefined);

  activeColumns = computed(() => {
    const currentWidth = this.currentWidth();
    if (currentWidth == null) return undefined;
    const columns = this.columns();
    if (Array.isArray(columns)) return columns;
    const keys = (Object.keys(columns) as (number | `${number}px` | "default")[])
      .map(key => key == 'default' ? 0 : key)
      .sort((a, b) => {
        const _a = (typeof a == 'string') ? Number(a.slice(0, -2)) : a;
        const _b = (typeof b == 'string') ? Number(b.slice(0, -2)) : b;
        return _b - _a;
      });
    const smallestKey = keys.find(key => {
      const _key = (typeof key == 'string') ? Number(key.slice(0, -2)) : key;
      return _key <= currentWidth
    }) ?? 'default';
    if (!(smallestKey in columns)) return undefined;
    return columns[smallestKey];
  })
  activeItemHeight = computed(() => {
    const currentWidth = this.currentWidth();
    if (currentWidth == null) return undefined;
    const itemHeight = this.itemHeight();
    if (typeof itemHeight == 'number') return itemHeight;
    const keys = (Object.keys(itemHeight) as (number | `${number}px` | "default")[])
      .map(key => key == 'default' ? 0 : key)
      .sort((a, b) => {
        const _a = (typeof a == 'string') ? Number(a.slice(0, -2)) : a;
        const _b = (typeof b == 'string') ? Number(b.slice(0, -2)) : b;
        return _b - _a;
      });
    const smallestKey = keys.find(key => {
      const _key = (typeof key == 'string') ? Number(key.slice(0, -2)) : key;
      return _key <= currentWidth
    }) ?? 'default';
    if (!(smallestKey in itemHeight)) return undefined;
    return itemHeight[smallestKey];
  })

  @HostBinding('style.--pui-table-columns') private hostColumnWidths: string | undefined = undefined;
  @HostBinding('class.pui-table--borderless') @Input({ transform: booleanAttribute }) borderless: boolean = false;

  cellDefs = contentChildren(TableCellDefDirective);
  headerCellDefs = contentChildren(TableHeaderCellDefDirective);

  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);

  constructor() {
    effect(() => {
      const currentWidth = this.currentWidth();
      const columnWidths = this.columnWidths();
      if (currentWidth == null || columnWidths == null) return;
      if (Array.isArray(columnWidths)) {
        this.setColumnWidths(columnWidths);
        return;
      }
      const keys = (Object.keys(columnWidths) as (number | `${number}px` | "default")[])
        .map(key => key == 'default' ? 0 : key)
        .sort((a, b) => {
          const _a = (typeof a == 'string') ? Number(a.slice(0, -2)) : a;
          const _b = (typeof b == 'string') ? Number(b.slice(0, -2)) : b;
          return _b - _a;
        });
      const smallestKey = keys.find(key => {
        const _key = (typeof key == 'string') ? Number(key.slice(0, -2)) : key;
        return _key <= currentWidth
      }) ?? 'default';
      if (smallestKey in columnWidths) {
        this.setColumnWidths(columnWidths[smallestKey]);
      }
    })
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        // const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const ro = new ResizeObserver((entries) => {
          this.zone.run(() => {
            const { width } = entries[0].contentRect;
            this.currentWidth.set(width);
          })
        });
        ro.observe(this.elementRef.nativeElement);
        this.destroyRef.onDestroy(() => {
          ro.disconnect();
        })
      }, { injector: this.injector });
    }
  }

  private setColumnWidths(widths: string[]) {
    this.hostColumnWidths = widths.join(' ')
  }
}