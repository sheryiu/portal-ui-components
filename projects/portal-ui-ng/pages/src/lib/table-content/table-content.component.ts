import { transition, trigger, useAnimation } from '@angular/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { isPlatformBrowser } from '@angular/common';
import { Component, computed, effect, inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IsInSetPipe, LodashGetPipe } from 'portal-ui-ng';
import { HoverableDirective } from 'portal-ui-ng/base';
import { FieldModule, LOADING_PANEL_ENTERING, LOADING_PANEL_LEAVING, LoadingPanelComponent, TableModule, TimeDisplayComponent } from 'portal-ui-ng/components';
import { combineLatest, map, timer } from 'rxjs';
import { flatten } from '../field-configuration';
import { LayoutControlDirective } from '../layout/layout-control.directive';
import { TABLE_CONTENT_DATA_PROVIDER, TABLE_CONTENT_DEFAULT_CONTROLS, TableContentDataProvider } from './table-content';

@Component({
  selector: 'pui-table-content',
  imports: [
    TableModule,
    HoverableDirective,
    LayoutControlDirective,
    TimeDisplayComponent,
    LodashGetPipe,
    ScrollingModule,
    FieldModule,
    IsInSetPipe,
    LoadingPanelComponent
  ],
  templateUrl: './table-content.component.html',
  styles: ``,
  host: {
    class: 'pui-table-content'
  },
  animations: [
    trigger('loading', [
      transition(':enter', useAnimation(LOADING_PANEL_ENTERING)),
      transition(':leave', useAnimation(LOADING_PANEL_LEAVING))
    ]),
  ]
})
export class TableContentComponent<T> implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private dataProvider = inject(TABLE_CONTENT_DATA_PROVIDER) as (TableContentDataProvider<T>)
  protected isBrowser = isPlatformBrowser(inject(PLATFORM_ID))

  protected readonly ROUTE_TO_DETAIL = Symbol();
  protected configuration = this.dataProvider.configuration;

  protected isLoading = computed(() => {
    return this.dataProvider.isLoading?.() ?? false;
  })
  protected data = computed(() => {
    const data = this.dataProvider.data();
    const routeToDetail = this.dataProvider.routeToDetail;
    return data?.map(item => Object.assign({}, item, { [this.ROUTE_TO_DETAIL]: routeToDetail?.bind(this.dataProvider)?.(item) }))
  })
  protected columnConfig = computed(() => {
    return this.dataProvider.columnsConfig();
  })
  protected columnsToDisplay = computed(() => {
    return this.dataProvider.columnsToDisplay();
  })
  protected selectionMode = computed(() => {
    return this.dataProvider.selectionMode?.() ?? null;
  })
  protected selectedItems = computed(() => {
    return this.dataProvider.selectedItems?.() ?? new Set();
  })
  protected controlsConfig = computed(() => {
    return this.dataProvider.controlsConfig?.() ?? TABLE_CONTENT_DEFAULT_CONTROLS
  })
  protected flattenFilterDef = computed(() => {
    const config = this.dataProvider.filterConfig?.();
    if (!config) return [];
    return flatten(config, {}, '', config.description ? `${config.description} / ` : '')
  })
  protected filterFormControl = inject(FormBuilder).nonNullable.control({} as any)

  protected isInitial = toSignal(timer(100).pipe(map(() => false)), { initialValue: true })

  constructor() {
    combineLatest([
      this.route.params,
      this.route.queryParams,
    ]).pipe(
      takeUntilDestroyed(),
    ).subscribe(([p, qp]) => this.dataProvider.onParamsChange?.(p, qp))
    effect(() => {
      if (this.dataProvider.filterValue) {
        this.filterFormControl.setValue(this.dataProvider.filterValue?.(), { emitEvent: false })
      }
    })
  }

  ngOnInit(): void {
    this.dataProvider?.onInit?.();
  }

  ngOnDestroy(): void {
    this.dataProvider?.onDestroy?.();
  }

  protected onRowClick(item: T) {
    this.dataProvider.onTableRowClick?.(item)
  }

  protected onHeaderClick(columnKey: string, event: MouseEvent) {
    this.dataProvider.onHeaderCellClick?.(columnKey, event)
  }

  protected onControlClick(id: string, event: MouseEvent) {
    this.dataProvider.onControlClick?.(id, event)
  }

  protected onFilterValueChange(value: any) {
    this.dataProvider.onFilterChange?.(value)
  }

  protected trackingFn(i: number, item: T) {
    return i;
  }

  protected cmpFn = this.dataProvider.compareFn ?? ((a, b) => a == b);
}
