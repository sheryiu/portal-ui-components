import { isPlatformBrowser } from '@angular/common';
import { booleanAttribute, Component, ElementRef, HostBinding, inject, Input, PLATFORM_ID, Renderer2 } from '@angular/core';
import { camelCase } from 'lodash-es';
import { TableCellDefDirective } from './table-cell-def.directive';

@Component({
  selector: 'pui-table-cell',
  standalone: true,
  host: {
    class: 'pui-table-cell',
    role: 'cell',
  },
  template: `<ng-content></ng-content>`
})
export class TableCellComponent {
  private renderer = inject(Renderer2);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private tableCellDef = inject(TableCellDefDirective);

  @HostBinding('attr.data-justify-end') @Input({ transform: booleanAttribute }) rightAligned: boolean = false;

  constructor() {
    const elRef = inject(ElementRef) as ElementRef<HTMLElement>;
    if (this.isBrowser && elRef.nativeElement) {
      this.renderer.addClass(elRef.nativeElement, `pui-table-column-${ camelCase(this.tableCellDef.columnName()) }`)
    }
  }
}