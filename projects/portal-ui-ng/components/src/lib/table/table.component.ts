import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, ElementRef, Injector, NgZone, PLATFORM_ID, afterNextRender, booleanAttribute, computed, contentChildren, inject, input, linkedSignal, signal } from '@angular/core';
import { TableCellDefDirective } from './table-cell/table-cell-def.directive';
import { TableHeaderCellDefDirective } from './table-header-cell/table-header-cell-def.directive';

@Component({
  selector: 'pui-table',
  imports: [],
  host: {
    role: 'table',
    class: 'pui-table @container/table',
    '[class.pui-table--single]': 'hostSingleClass()',
    '[class.pui-table--multi]': 'hostMultiClass()',
    '[style.--pui-table-columns]': 'hostColumnWidths()',
    '[style.--pui-table-number-of-columns]': 'hostNumberOfColumns()'
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
  resizable = input(true, { transform: booleanAttribute })
  private componentWidth = signal<number | undefined>(undefined);

  activeColumns = linkedSignal(() => {
    const componentWidth = this.componentWidth();
    if (componentWidth == null) return undefined;
    const columns = this.columns();
    if (Array.isArray(columns)) return columns;
    const keys = (Object.keys(columns) as (number | "default")[])
      .filter(key => key != 'default')
      .sort((a, b) =>  b - a);
    const smallestKey = keys.find(key => key <= componentWidth) ?? 'default';
    if (!(smallestKey in columns)) return undefined;
    return columns[smallestKey];
  })
  activeColumnWidths = linkedSignal(() => {
    const componentWidth = this.componentWidth();
    if (componentWidth == null) return undefined;
    const columnWidths = this.columnWidths();
    if (Array.isArray(columnWidths)) return columnWidths;
    if (columnWidths == null) return undefined;
    const keys = (Object.keys(columnWidths) as (number | "default")[])
      .filter(key => key != 'default')
      .sort((a, b) =>  b - a);
    const smallestKey = keys.find(key => key <= componentWidth) ?? 'default';
    if (!(smallestKey in columnWidths)) return undefined;
    return columnWidths[smallestKey];
  })
  activeItemHeight = computed(() => {
    const componentWidth = this.componentWidth();
    if (componentWidth == null) return undefined;
    const itemHeight = this.itemHeight();
    if (typeof itemHeight == 'number') return itemHeight;
    const keys = (Object.keys(itemHeight) as (number | "default")[])
      .filter(key => key != 'default')
      .sort((a, b) =>  b - a);
    const smallestKey = keys.find(key => key <= componentWidth) ?? 'default';
    if (!(smallestKey in itemHeight)) return undefined;
    return itemHeight[smallestKey];
  })

  private hostSingleClass = computed(() => this.selectionMode() == 'single');
  private hostMultiClass = computed(() => this.selectionMode() == 'multi');
  private hostColumnWidths = computed(() => {
    return this.activeColumnWidths()?.join(' ')
  })
  private hostNumberOfColumns = computed(() => {
    return this.activeColumnWidths()?.length;
  })

  cellDefs = contentChildren(TableCellDefDirective);
  headerCellDefs = contentChildren(TableHeaderCellDefDirective);

  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      afterNextRender(() => {
        const ro = new ResizeObserver((entries) => {
          this.zone.run(() => {
            const { width } = entries[0].contentRect;
            this.componentWidth.set(width);
          })
        });
        ro.observe(this.elementRef.nativeElement);
        this.destroyRef.onDestroy(() => {
          ro.disconnect();
        })
      }, { injector: this.injector });
    }
  }

  public columnResized(newSize: number, columnName: string, index: number) {
    this.activeColumnWidths.update(columnWidths => {
      if (!columnWidths) return columnWidths;
      if (columnWidths.length < index) {
        const newWidths = [] as string[];
        for (let i = 0; i < index; i++) {
          if (columnWidths[i]) newWidths[i] = columnWidths[i];
          else newWidths[i] = 'minmax(0, 1fr)';
        }
        newWidths[index] = `${ newSize }px`;
        return newWidths;
      }
      const newWidths = [...columnWidths];
      newWidths[index] = `${ newSize }px`;
      return newWidths;
    })
    // TODO update the input columnWidths as well
    // the activeColumnWidths will get reset when resize
  }
}