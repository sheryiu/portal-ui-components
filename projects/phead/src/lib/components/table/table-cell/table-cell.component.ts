import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, PLATFORM_ID, Renderer2, inject } from '@angular/core';
import { TableCellDefDirective } from './table-cell-def.directive';

@Component({
  selector: 'phead-table-cell',
  standalone: true,
  host: {
    class: 'phead-table-cell',
    role: 'cell',
  },
  template: `<ng-content></ng-content>`
})
export class TableCellComponent {
  private renderer = inject(Renderer2);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private tableCellDef = inject(TableCellDefDirective);

  constructor() {
    const elRef = inject(ElementRef) as ElementRef<HTMLElement>;
    if (this.isBrowser && elRef.nativeElement) {
      this.renderer.addClass(elRef.nativeElement, `phead-table-column-${ this.tableCellDef.columnName }`)
    }
  }
}