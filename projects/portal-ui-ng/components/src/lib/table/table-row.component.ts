import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, output } from '@angular/core';
import { IsActiveMatchOptions, NavigationBehaviorOptions, RouterLink, RouterLinkActive, UrlCreationOptions } from '@angular/router';
import { TableComponent } from './table.component';

@Component({
  selector: 'pui-table-row',
  imports: [RouterLink, RouterLinkActive, NgTemplateOutlet],
  host: {
    class: 'pui-table-row',
    role: 'row',
    '[class.pui-table-row--selected]': 'selected()'
  },
  template: `
  @let options = routerOptions();
  @let routerLinkActiveOptions = activeOptions();
  <a
    [routerLink]="route()"
    [state]="options?.state"
    [skipLocationChange]="options?.skipLocationChange"
    [queryParams]="options?.queryParams"
    [queryParamsHandling]="options?.queryParamsHandling"
    [fragment]="options?.fragment"
    [preserveFragment]="options?.preserveFragment"
    [relativeTo]="options?.relativeTo ?? undefined"
    [replaceUrl]="options?.replaceUrl"
    routerLinkActive
    #active="routerLinkActive"
    [routerLinkActiveOptions]="routerLinkActiveOptions ?? { exact: false }"
    [attr.data-active]="active.isActive"
    [style.height.px]="height()"
    (click)="rowClick.emit($event)"
  >
    @for (def of cells(); track def.columnName) {
      @if (def.templateRef == null) {
        <div></div>
      } @else {
        <ng-container [ngTemplateOutlet]="def.templateRef" [ngTemplateOutletContext]="{ $implicit: item() }"></ng-container>
      }
    }
  </a>
  `
})
export class TableRowComponent<T> {
  private table = inject(TableComponent);

  item = input.required<T>()
  route = input<any[]>()
  routerOptions = input<NavigationBehaviorOptions & UrlCreationOptions>();
  activeOptions = input<IsActiveMatchOptions | { exact: boolean; }>();
  selected = input<boolean>();
  rowClick = output<MouseEvent>();
  height = this.table.activeItemHeight;

  cells = computed(() => {
    const columns = this.table.activeColumns();
    if (columns == null) return undefined;
    const cellDefs = this.table.cellDefs();
    return columns
      .map(columnName => cellDefs.find(def => def.columnName() == columnName))
      .map((def, i) => def ? ({
        columnName: def.columnName(),
        templateRef: def.templateRef,
      }) : {
        columnName: `__empty_${ i }`,
        templateRef: null,
      })
  })

}
