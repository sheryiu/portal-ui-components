import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, PLATFORM_ID, Renderer2, booleanAttribute, inject, input, output } from '@angular/core';
import { HoverableDirective } from '../../../base';
import { TableHeaderCellDefDirective } from './table-header-cell-def.directive';

@Component({
  selector: 'pui-table-header-cell',
  standalone: true,
  imports: [
    HoverableDirective,
  ],
  host: {
    class: 'pui-table-header-cell',
    role: 'cell',
  },
  templateUrl: './table-header-cell.component.html',
})
export class TableHeaderCellComponent {
  private renderer = inject(Renderer2);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private tableCellDef = inject(TableHeaderCellDefDirective);

  rightAligned = input(false, { transform: booleanAttribute })
  sortedAsc = input(false, { transform: booleanAttribute })
  sortedDesc = input(false, { transform: booleanAttribute })
  cellClick = output<MouseEvent>();

  constructor() {
    const elRef = inject(ElementRef) as ElementRef<HTMLElement>;
    if (this.isBrowser && elRef.nativeElement) {
      this.renderer.addClass(elRef.nativeElement, `pui-table-column-${ this.tableCellDef.columnName }`)
    }
  }
}