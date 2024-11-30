import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, computed, effect, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HoverableDirective, LodashGetPipe } from '../../base';
import { FieldModule, TableModule, TimeDisplayComponent } from '../../components';
import { ObjectJsonSchema } from '../editable-content/editable-content';
import { flattenObjectJsonSchema } from '../editable-content/editable-content.component';
import { LayoutControlDirective } from '../layout/layout-control.directive';
import { ColumnConfig, TABLE_CONTENT_DATA_PROVIDER, TableContentDataProvider } from './table-content';

@Component({
  selector: 'pui-table-content',
  standalone: true,
  imports: [
    TableModule,
    HoverableDirective,
    LayoutControlDirective,
    TimeDisplayComponent,
    LodashGetPipe,
    ScrollingModule,
    FieldModule,
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
  inputColumnConfig = input<ColumnConfig[] | undefined>(undefined, { alias: 'columnConfig' })
  inputColumnsToDisplay = input<string[] | undefined>(undefined, { alias: 'columnsToDisplay' })
  inputRouteToDetail = input<((item: T) => any[]) | undefined>(undefined, { alias: 'routeToDetail' })
  inputSimpleFilterConfig = input<ObjectJsonSchema | undefined>(undefined, { alias: 'simpleFilterConfig'})
  headerCellClick = output<{ columnKey: string; event: MouseEvent }>()
  filter = output<any>();
  refresh = output<void>();
  add = output<void>();
  currentSimpleFilterUpdate = output<any>();

  protected readonly ROUTE_TO_DETAIL = Symbol();
  protected configuration = this.dataProvider?.configuration;

  protected data = computed(() => {
    const data = this.dataProvider?.data() ?? this.inputData();
    const routeToDetail = this.dataProvider?.routeToDetail ?? this.inputRouteToDetail();
    return data?.map(item => Object.assign({}, item, { [this.ROUTE_TO_DETAIL]: routeToDetail?.(item) }))
  })
  protected columnConfig = computed(() => {
    return this.dataProvider?.columnsConfig() ?? this.inputColumnConfig();
  })
  protected columnsToDisplay = computed(() => {
    return this.dataProvider?.columnsToDisplay() ?? this.inputColumnsToDisplay();
  })
  protected flattenSimpleFilterDef = computed(() => {
    const config = this.dataProvider?.simpleFilterConfig?.() ?? this.inputSimpleFilterConfig()
    if (!config) return [];
    return flattenObjectJsonSchema(config, {}, '', config.description ? `${config.description} / ` : '')
  })
  protected simpleFilterFormControl = inject(FormBuilder).nonNullable.control({} as any)

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
    this.simpleFilterFormControl.events.pipe(
      takeUntilDestroyed(),
    ).subscribe(event => {
      if (this.dataProvider) {
        this.dataProvider.currentSimpleFilter?.set(this.simpleFilterFormControl.getRawValue())
      } else {
        this.currentSimpleFilterUpdate.emit(this.simpleFilterFormControl.getRawValue())
      }
    })
    effect(() => {
      // TODO shouldn't use currentsimplefilter?
      if (this.dataProvider?.currentSimpleFilter) {
        this.simpleFilterFormControl.setValue(this.dataProvider?.currentSimpleFilter?.())
      }
    }, { allowSignalWrites: true })
  }

  protected onHeaderClick(columnKey: string, event: MouseEvent) {
    if (this.dataProvider) {
      this.dataProvider.headerCellClick?.(columnKey, event)
    } else {
      this.headerCellClick.emit({ columnKey, event })
    }
  }

  protected onFilterClick() {
    if (this.dataProvider) {
      this.dataProvider.filter?.();
    } else {
      this.filter.emit({});
    }
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

  protected trackingFn(i: number, item: T) {
    return i;
  }
}
