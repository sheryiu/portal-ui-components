import { Component, computed, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { HoverableDirective, LodashGetPipe } from '../../base';
import { TableModule, TimeDisplayComponent } from '../../components';
import { LayoutControlDirective } from '../layout/layout-control.directive';
import { TABLE_CONTENT_DATA_PROVIDER, TableContentDataProvider } from './table-content';

@Component({
  selector: 'pui-table-content',
  standalone: true,
  imports: [
    TableModule,
    HoverableDirective,
    LayoutControlDirective,
    TimeDisplayComponent,
    LodashGetPipe,
  ],
  templateUrl: './table-content.component.html',
  styles: ``,
  host: {
    class: 'pui-table-content'
  }
})
export class TableContentComponent<T> {
  private route = inject(ActivatedRoute);
  private dataProvider = inject(TABLE_CONTENT_DATA_PROVIDER, { optional: true }) as (TableContentDataProvider<T> | undefined)

  inputData = input<T[] | undefined>(undefined, { alias: 'data' })
  inputRouteToDetail = input<((item: T) => any[]) | undefined>(undefined, { alias: 'routeToDetail' })
  refresh = output<void>();
  add = output<void>();

  protected readonly ROUTE_TO_DETAIL = Symbol();
  configuration = this.dataProvider?.configuration;

  protected data = computed(() => {
    const data = this.dataProvider?.data() ?? this.inputData();
    const routeToDetail = this.dataProvider?.routeToDetail ?? this.inputRouteToDetail();
    return data?.map(item => Object.assign({}, item, { [this.ROUTE_TO_DETAIL]: routeToDetail?.(item) }))
  })
  protected columnConfig = computed(() => {
    return this.dataProvider?.columnsConfig();
  })
  protected columnsToDisplay = computed(() => {
    return this.dataProvider?.columnsToDisplay();
  })

  constructor() {
    this.route.params.pipe(
      takeUntilDestroyed(),
    ).subscribe((params) => {
      this.dataProvider?.params?.set(params);
    })
    this.route.queryParams.pipe(
      takeUntilDestroyed(),
    ).subscribe((params) => {
      this.dataProvider?.queryParams?.set(params);
    })
  }

  protected onRefreshClick() {
    if (this.dataProvider) {
      this.dataProvider.refresh?.();
    } else {
      this.refresh.emit();
    }
  }

  protected onAddClick() {
    if (this.dataProvider) {
      this.dataProvider.add?.();
    } else {
      this.add.emit();
    }
  }
}
