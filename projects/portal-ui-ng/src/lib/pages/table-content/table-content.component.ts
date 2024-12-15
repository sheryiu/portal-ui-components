import { ScrollingModule } from '@angular/cdk/scrolling';
import { isPlatformBrowser } from '@angular/common';
import { Component, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HoverableDirective, IsInSetPipe, LodashGetPipe } from '../../base';
import { FieldModule, TableModule, TimeDisplayComponent } from '../../components';
import { flattenObjectJsonSchema } from '../editable-content/editable-content.component';
import { LayoutControlDirective } from '../layout/layout-control.directive';
import { TABLE_CONTENT_DATA_PROVIDER, TABLE_CONTENT_DEFAULT_CONTROLS, TableContentDataProvider } from './table-content';

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
    IsInSetPipe,
  ],
  templateUrl: './table-content.component.html',
  styles: ``,
  host: {
    class: 'pui-table-content'
  }
})
export class TableContentComponent<T> {
  private route = inject(ActivatedRoute);
  private dataProvider = inject(TABLE_CONTENT_DATA_PROVIDER) as (TableContentDataProvider<T>)
  protected isBrowser = isPlatformBrowser(inject(PLATFORM_ID))

  protected readonly ROUTE_TO_DETAIL = Symbol();
  protected configuration = this.dataProvider.configuration;

  protected data = computed(() => {
    const data = this.dataProvider.data();
    const routeToDetail = this.dataProvider.routeToDetail;
    return data?.map(item => Object.assign({}, item, { [this.ROUTE_TO_DETAIL]: routeToDetail?.(item) }))
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
  protected flattenSimpleFilterDef = computed(() => {
    const config = this.dataProvider.simpleFilterConfig?.();
    if (!config) return [];
    return flattenObjectJsonSchema(config, {}, '', config.description ? `${config.description} / ` : '')
  })
  protected simpleFilterFormControl = inject(FormBuilder).nonNullable.control({} as any)

  constructor() {
    this.route.params.pipe(
      takeUntilDestroyed(),
    ).subscribe((params) => {
      this.dataProvider.params?.set(params);
    })
    this.route.queryParams.pipe(
      takeUntilDestroyed(),
    ).subscribe((params) => {
      this.dataProvider.queryParams?.set(params);
    })
    effect(() => {
      if (this.dataProvider.simpleFilterValue) {
        this.simpleFilterFormControl.setValue(this.dataProvider.simpleFilterValue?.(), { emitEvent: false })
      }
    }, { allowSignalWrites: true })
  }

  protected onRowClick(item: T) {
    if (this.dataProvider.selectionMode?.() == 'single') {
      this.dataProvider.selectedItems?.set(new Set([item]))
    } else if (this.dataProvider.selectionMode?.() == 'multi') {
      this.dataProvider.selectedItems?.update(old => {
        const clone = new Set(old)
        if (old.has(item)) {
          clone.delete(item)
        } else {
          clone.add(item)
        }
        return clone;
      })
    }
    this.dataProvider.onTableRowClick?.(item)
  }

  protected onHeaderClick(columnKey: string, event: MouseEvent) {
    this.dataProvider.onHeaderCellClick?.(columnKey, event)
  }

  protected onControlClick(id: string, event: MouseEvent) {
    this.dataProvider.onControlClick?.(id, event)
  }

  protected onSimpleFilterValueChange(value: any) {
    this.dataProvider.onUpdateSimpleFilter?.(value)
  }

  protected trackingFn(i: number, item: T) {
    return i;
  }

  protected cmpFn = this.dataProvider.compareFn ?? ((a, b) => a == b);
}
