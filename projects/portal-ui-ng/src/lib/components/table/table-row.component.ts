import { NgTemplateOutlet } from '@angular/common';
import { Component, HostBinding, Input, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { isNonNull } from '../../base';
import { TableComponent } from './table.component';

@Component({
  selector: 'pui-table-row',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgTemplateOutlet],
  host: {
    class: 'pui-table-row',
    role: 'row',
  },
  template: `
  <a
    [routerLink]="route"
    [relativeTo]="relativeTo"
    routerLinkActive
    #active="routerLinkActive"
    [attr.data-active]="active.isActive"
    [style.height.px]="height()"
  >
    @for (def of cells(); track def.columnName) {
      <ng-container [ngTemplateOutlet]="def.templateRef" [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
    }
  </a>
  `
})
export class TableRowComponent<T> {
  @Input({ required: true }) item!: T;
  @Input() route?: any[];
  @Input() relativeTo?: ActivatedRoute | null = inject(ActivatedRoute);
  @HostBinding('style.grid-column-end') private hostColumnEnd?: string;
  private table = inject(TableComponent);
  height = this.table.activeItemHeight;
  cells = computed(() => {
    const columns = this.table.activeColumns();
    if (columns == null) return undefined;
    const cellDefs = this.table.cellDefs();
    return columns
      .map(columnName => cellDefs.find(def => def.columnName == columnName))
      .filter(isNonNull)
      .map(def => ({
        columnName: def.columnName,
        templateRef: def.templateRef,
      }))
  })

  constructor() {
    effect(() => {
      const cells = this.cells();
      if (cells) {
        this.hostColumnEnd = `span ${ cells?.length }`
      }
    })
  }

}
