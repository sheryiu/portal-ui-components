import { PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { AsyncPipe } from '@angular/common';
import { Component, ContentChildren, HostBinding, Input, QueryList, ViewContainerRef, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { map, tap } from 'rxjs';
import { TableCellDefDirective } from './table-cell-def.directive';
import { TableComponent } from './table.component';

@Component({
  selector: 'core-table-row',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe, PortalModule],
  host: {
    class: 'core-table-row',
    role: 'row',
  },
  template: `
  <a
    [routerLink]="route"
    routerLinkActive
    #active="routerLinkActive"
    [attr.data-active]="active.isActive"
    [style.height.px]="height$ | async"
  >
    @for (def of cells$(); track def.columnName) {
      <ng-container [cdkPortalOutlet]="def.portal"></ng-container>
    }
  </a>
  `
})
export class TableRowComponent {
  @Input() route?: any[];
  @Input() relativeTo?: ActivatedRoute | null;
  @ContentChildren(TableCellDefDirective) private cellDefs!: QueryList<TableCellDefDirective>;
  @HostBinding('style.grid-column-end') private hostColumnEnd?: string;
  private table = inject(TableComponent);
  private vcr = inject(ViewContainerRef);

  private cache = new Map<string, TemplatePortal>();

  height$ = this.table.itemHeight$;
  cells$ = toSignal(this.table.columns$.pipe(
    map(columns => columns
      .map(columnName => this.cellDefs.find(def => def.columnName === columnName))
      .filter((def): def is TableCellDefDirective => def != null)
      .map(def => ({
        columnName: def.columnName,
        portal: this.cache.has(def.columnName) ?
          this.cache.get(def.columnName) :
          this.cache.set(def.columnName, new TemplatePortal(def.templateRef, this.vcr)).get(def.columnName),
      }))
    ),
    tap((defs) => this.hostColumnEnd = `span ${ defs.length }`)
  ))

}
