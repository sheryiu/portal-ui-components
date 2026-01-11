import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, ElementRef, Injector, NgZone, PLATFORM_ID, afterNextRender, booleanAttribute, computed, contentChildren, effect, inject, input, linkedSignal, output, signal } from '@angular/core';
import { isEqual } from 'lodash-es';
import { STORAGE } from 'portal-ui-ng';
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
  id = input<string>();
  itemHeight = input.required<Record<'default' | number, number> | number>();
  /**
   * when using Record<number, string[]>, the number represents the minimum width that the display columns will become active
   */
  inputColumns = input.required<Record<'default' | number, string[]> | string[]>({ alias: 'columns' });
  inputColumnWidths = input<Record<'default' | number, string[]> | string[]>(undefined, { alias: 'columnWidths' });
  selectionMode = input<'single' | 'multi' | null>(null)
  resizable = input(true, { transform: booleanAttribute })
  columnResized = output<{ resizedKey: 'default' | number; newColumnWidths: string[] }>()
  private componentWidth = signal<number | undefined>(undefined);

  private columns = linkedSignal(() => {
    const columns = this.inputColumns();
    if (columns == null) return { 'default': [] as string[] };
    if (Array.isArray(columns)) return { 'default': columns };
    return columns;
  })
  private activeColumnsKey = computed(() => {
    const componentWidth = this.componentWidth();
    if (componentWidth == null) return 'default';
    const columns = this.columns();
    const keys = (Object.keys(columns) as (number | "default")[])
      .filter(key => key != 'default')
      .sort((a, b) =>  b - a);
    const smallestKey = keys.find(key => key <= componentWidth) ?? 'default';
    return smallestKey;
  })
  activeColumns = linkedSignal(() => this.columns()[this.activeColumnsKey()])

  private storedResizedColumnWidths = signal<Record<'default' | number, string[]> | null>(null)
  private columnWidths = linkedSignal(() => {
    const columnWidths = this.inputColumnWidths();
    const stored = this.storedResizedColumnWidths();
    if (stored != null) return stored;
    if (columnWidths == null) return { 'default': [] as string[] };
    if (Array.isArray(columnWidths)) return { 'default': columnWidths };
    return columnWidths;
  })
  private activeColumnWidthsKey = computed(() => {
    const componentWidth = this.componentWidth();
    if (componentWidth == null) return 'default';
    const columnWidths = this.columnWidths();
    const keys = (Object.keys(columnWidths) as (number | "default")[])
      .filter(key => key != 'default')
      .sort((a, b) =>  b - a);
    const smallestKey = keys.find(key => key <= componentWidth) ?? 'default';
    return smallestKey;
  })
  private activeColumnWidths = linkedSignal(() => this.columnWidths()[this.activeColumnWidthsKey()]);
  visibleColumnWidths = computed(() => {
    const columns = this.activeColumns()
    const widths = this.activeColumnWidths()
    const visible = widths.slice(0, columns.length)
    if (visible.length == columns.length) return visible.toSpliced(visible.length - 1, 1, 'minmax(80px, 1fr)');
    return visible.toSpliced(visible.length, 0, ...Array(columns.length - visible.length).fill('minmax(80px, 1fr)'));
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

  hostSingleClass = computed(() => this.selectionMode() == 'single');
  hostMultiClass = computed(() => this.selectionMode() == 'multi');
  hostColumnWidths = computed(() => this.visibleColumnWidths().join(' '))
  hostNumberOfColumns = computed(() => this.activeColumns().length)

  cellDefs = contentChildren(TableCellDefDirective);
  headerCellDefs = contentChildren(TableHeaderCellDefDirective);

  private elementRef = inject(ElementRef) as ElementRef<HTMLElement>;
  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);
  private storage = inject(STORAGE, { optional: true })

  constructor() {
    effect(() => {
      const id = this.id();
      const inputColumnWidths = this.inputColumnWidths();
      if (id != null && inputColumnWidths != null && this.storage != null) {
        if (this.storage.getItem(`pui-table.${ id }`)) {
          const { key, resized } = JSON.parse(this.storage.getItem(`pui-table.${ id }`)!)
          if (isEqual(key, inputColumnWidths)) {
            this.storedResizedColumnWidths.set(resized);
          } else {
            this.storage.removeItem(`pui-table.${ id }`)
          }
        }
      }
    })
  }

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

  public onColumnResized(newSize: number, columnName: string, index: number) {
    const size = Math.max(newSize, 80);
    const activeKey = this.activeColumnWidthsKey();
    this.columnWidths.update(columnWidths => {
      const active = columnWidths[activeKey];
      let newWidths = [] as string[];
      if (active.length < index) {
        for (let i = 0; i < index; i++) {
          if (active[i]) newWidths[i] = active[i];
          else newWidths[i] = 'minmax(80px, 1fr)';
        }
      } else {
        newWidths = [...active];
      }
      newWidths[index] = `minmax(auto, ${ size }px)`;
      return {
        ...columnWidths,
        [activeKey]: newWidths,
      }
    })
    this.columnResized.emit({
      resizedKey: activeKey,
      newColumnWidths: this.columnWidths()[activeKey],
    })
    const id = this.id();
    const inputColumnWidths = this.inputColumnWidths();
    if (id != null && inputColumnWidths != null && this.storage != null) {
      this.storage.setItem(`pui-table.${ id }`, JSON.stringify({
        key: inputColumnWidths,
        resized: this.columnWidths(),
      }))
    }
  }
}