import { isPlatformBrowser } from '@angular/common';
import { booleanAttribute, Component, effect, ElementRef, inject, input, PLATFORM_ID, Renderer2 } from '@angular/core';
import { camelCase } from 'lodash-es';
import { TableCellDefDirective } from './table-cell-def.directive';

@Component({
  selector: 'pui-table-cell',
  standalone: true,
  host: {
    class: 'pui-table-cell',
    role: 'cell',
    '[attr.data-justify-end]': 'rightAligned()'
  },
  template: `<ng-content></ng-content>`
})
export class TableCellComponent {
  private renderer = inject(Renderer2);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private tableCellDef = inject(TableCellDefDirective);

  readonly rightAligned = input(false, { transform: booleanAttribute });

  constructor() {
    const elRef = inject(ElementRef) as ElementRef<HTMLElement>;
    if (this.isBrowser && elRef.nativeElement) {
      effect(() => {
        this.renderer.addClass(elRef.nativeElement, `pui-table-column-${ camelCase(this.tableCellDef.columnName()) }`)
      })
    }
  }
}