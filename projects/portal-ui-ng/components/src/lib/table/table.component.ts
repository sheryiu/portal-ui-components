import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, ElementRef, Injector, NgZone, PLATFORM_ID, afterNextRender, computed, contentChildren, effect, inject, input, signal } from '@angular/core';
import { TableCellDefDirective } from './table-cell/table-cell-def.directive';
import { TableHeaderCellDefDirective } from './table-header-cell/table-header-cell-def.directive';

@Component({
  selector: 'pui-table',
  imports: [],
  host: {
    role: 'table',
    class: 'pui-table @container/table',
    '[class.pui-table--single]': 'hostSingleClass',
    '[class.pui-table--multi]': 'hostMultiClass',
    '[style.--pui-table-columns]': 'hostColumnWidths',
    '[style.--pui-table-number-of-columns]': 'hostNumberOfColumns'
  },
  template: `<ng-content></ng-content>`
})
export class TableComponent {
  itemHeight = input.required<Record<'default' | number, number> | number>();
  /**
   * when using Record<number, string[]>, the number represents the minimum width that the display columns will become active
   */
  columns = input.required<Record<'default' | number, string[]> | string[]>();
  columnWidths = input<Record<'default' | number, string[]> | string[]>();
  selectionMode = input<'single' | 'multi' | null>(null)
  private currentWidth = signal<number | undefined>(undefined);

  activeColumns = computed(() => {
    const currentWidth = this.currentWidth();
    if (currentWidth == null) return undefined;
    const columns = this.columns();
    if (Array.isArray(columns)) return columns;
    const keys = (Object.keys(columns) as (number | "default")[])
      .filter(key => key != 'default')
      .sort((a, b) =>  b - a);
    const smallestKey = keys.find(key => key <= currentWidth) ?? 'default';
    if (!(smallestKey in columns)) return undefined;
    return columns[smallestKey];
  })
  activeItemHeight = computed(() => {
    const currentWidth = this.currentWidth();
    if (currentWidth == null) return undefined;
    const itemHeight = this.itemHeight();
    if (typeof itemHeight == 'number') return itemHeight;
    const keys = (Object.keys(itemHeight) as (number | "default")[])
      .filter(key => key != 'default')
      .sort((a, b) =>  b - a);
    const smallestKey = keys.find(key => key <= currentWidth) ?? 'default';
    if (!(smallestKey in itemHeight)) return undefined;
    return itemHeight[smallestKey];
  })

  private hostSingleClass = false;
  private hostMultiClass = false;
  private hostColumnWidths: string | undefined = undefined;
  private hostNumberOfColumns: number | undefined = undefined;

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
      const keys = (Object.keys(columnWidths) as (number | "default")[])
        .filter(key => key != 'default')
        .sort((a, b) =>  b - a);
      const smallestKey = keys.find(key => key <= currentWidth) ?? 'default';
      if (smallestKey in columnWidths) {
        this.setColumnWidths(columnWidths[smallestKey]);
      }
    })
    effect(() => {
      this.hostNumberOfColumns = this.activeColumns()?.length;
    })
    effect(() => {
      this.hostSingleClass = this.selectionMode() == 'single';
      this.hostMultiClass = this.selectionMode() == 'multi';
    })
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
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