import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ScreenWidthDetectorService } from 'portal-ui-ng';
import { ColumnConfig, computeFilterFunction, computeSortFunction, ObjectFieldConfiguration, TABLE_CONTENT_DEFAULT_CONTROLS, TableContentDataProvider, updateSortedColumn } from 'portal-ui-ng/pages';
import { MediaDataService } from '../../data/media-data.service';
import { Media } from '../../data/media.types';

@Injectable()
export class MediaTableService implements TableContentDataProvider<Media> {
  private dataService = inject(MediaDataService);

  private screenWidth = inject(ScreenWidthDetectorService);
  private rawData = toSignal(this.dataService.getList())

  configuration = {
    useVirtualScroll: true,
  };
  data = computed(() => {
    const rawData = this.rawData() ?? [];
    return rawData
      .toSorted(this.sortFn())
      .filter(this.filterFn());
  });
  columnsConfig = signal<ColumnConfig[]>([
    {
      key: 'filename',
      label: 'Filename',
    },
    {
      key: 'sizeBytes',
      label: 'Size (Bytes)'
    },
    {
      key: 'type',
      label: 'Type',
    },
    {
      key: 'createdAt',
      label: 'Created At',
      fieldConfiguration: {
        type: 'date-time',
      }
    },
    {
      key: 'lastModifiedAt',
      label: 'Last Modified At',
      fieldConfiguration: {
        type: 'date-time',
      }
    }
  ]);
  columnsToDisplay = signal<string[] | Record<number | 'default', string[]>>({
    default: ['filename', 'sizeBytes'],
    768: ['filename', 'sizeBytes', 'createdAt'],
    1280: ['filename', 'sizeBytes', 'type', 'createdAt', 'lastModifiedAt'],
  });
  controlsConfig = signal(TABLE_CONTENT_DEFAULT_CONTROLS);
  filterConfig = signal<ObjectFieldConfiguration>({
    type: 'object',
    properties: {
      // TODO filter fields configuration
    }
  })
  filterValue = signal<{
    // TODO filter value type
  }>({})

  private sortFn = computed<(a: Media, b: Media) => number>(() => {
    return computeSortFunction(this.columnsConfig())
  })
  private filterFn = computed<(item: Media) => boolean>(() => {
    return computeFilterFunction(this.filterValue(), {
      // TODO filter matching methods
    })
  })

  routeToDetail(item: Media): any[] {
    if (this.screenWidth.above().sm()) {
      return ['../../', 'media', { outlets: { peek: [item.id] } }]
    }
    return ['../', 'detail', item.id]
  }
  onHeaderCellClick(columnKey: string, event: MouseEvent): void {
    this.columnsConfig.update(columns => updateSortedColumn(columns, columnKey))
  }
  onFilterChange(value: any): void {
    this.filterValue.set(value)
  }
  onControlClick(key: string, event: MouseEvent): void {
    switch (key) {
      case 'add': {
        // TODO on add click
        break;
      }
      case 'refresh': {
        // TODO on refresh click
        break;
      }
    }
  }
}
