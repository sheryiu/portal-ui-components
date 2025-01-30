import { computed, Injectable, signal } from '@angular/core';
import { Params } from '@angular/router';
import { PeekableAddonDataProvider, TabConfig, VerticalLayoutDataProvider } from 'portal-ui-ng/pages';

@Injectable()
export class MediaDetailService implements VerticalLayoutDataProvider, PeekableAddonDataProvider {
  private id = signal<string | undefined>(undefined);

  heading = computed(() => this.id() ?? '--')
  tabs = signal<TabConfig[]>([
    {
      label: 'Raw',
      route: ['raw']
    }
  ]);

  routeToFullContent = computed(() => {
    return ['../', 'media', { outlets: {
      primary: ['detail', this.id()],
      peek: null,
    } }]
  })

  onParamsChange(params: Params, queryParams: Params): void {
    this.id.set(params['id'])
  }
}
