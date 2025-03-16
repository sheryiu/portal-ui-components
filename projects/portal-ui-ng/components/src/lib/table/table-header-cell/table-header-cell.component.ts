import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, PLATFORM_ID, Renderer2, booleanAttribute, computed, effect, inject, input, output } from '@angular/core';
import { HoverableDirective } from 'portal-ui-ng/base';
import { TableHeaderCellDefDirective } from './table-header-cell-def.directive';

@Component({
  selector: 'pui-table-header-cell',
  imports: [
    HoverableDirective,
  ],
  host: {
    class: 'pui-table-header-cell',
    role: 'cell',
  },
  templateUrl: './table-header-cell.component.html'
})
export class TableHeaderCellComponent {
  private renderer = inject(Renderer2);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private tableCellDef = inject(TableHeaderCellDefDirective);

  columnName = computed(() => this.tableCellDef.columnName())
  rightAligned = input(false, { transform: booleanAttribute })
  sortedAsc = input(false, { transform: booleanAttribute })
  sortedDesc = input(false, { transform: booleanAttribute })
  cellClick = output<MouseEvent>();

  constructor() {
    const elRef = inject(ElementRef) as ElementRef<HTMLElement>;
    if (this.isBrowser && elRef.nativeElement) {
      effect(() => {
        this.renderer.addClass(elRef.nativeElement, `pui-table-column-${ this.tableCellDef.columnName() }`)
      })
    }
  }
}