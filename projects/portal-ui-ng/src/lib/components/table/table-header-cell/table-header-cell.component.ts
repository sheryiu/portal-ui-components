import { NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Input, PLATFORM_ID, Renderer2, booleanAttribute, inject } from '@angular/core';
import { HoverableDirective } from '../../../base';
import { DividerComponent } from '../../divider';
import { TableHeaderCellDefDirective } from './table-header-cell-def.directive';

@Component({
  selector: 'pui-table-header-cell',
  standalone: true,
  imports: [
    HoverableDirective,
    NgTemplateOutlet,
    DividerComponent,
  ],
  host: {
    class: 'pui-table-header-cell',
    role: 'cell',
  },
  templateUrl: './table-header-cell.component.html',
})
export class TableHeaderCellComponent {
  @Input({ transform: booleanAttribute }) rightAligned: boolean = false;
  @Input({ transform: booleanAttribute }) sortedAsc: boolean = false;
  @Input({ transform: booleanAttribute }) sortedDesc: boolean = false;

  private renderer = inject(Renderer2);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private tableCellDef = inject(TableHeaderCellDefDirective);

  constructor() {
    const elRef = inject(ElementRef) as ElementRef<HTMLElement>;
    if (this.isBrowser && elRef.nativeElement) {
      this.renderer.addClass(elRef.nativeElement, `pui-table-column-${ this.tableCellDef.columnName }`)
    }
  }
}