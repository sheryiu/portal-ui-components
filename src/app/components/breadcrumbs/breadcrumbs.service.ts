import { Observable } from 'rxjs';

const BREADCRUMB_SYMBOL = Symbol('breadcrumb');

export type Breadcrumb = {
  id: string;
  title?: string;
  titleFn?: () => Observable<string> | string;
  icon?: string;
};

export function getBreadcrumb(routeData: any): Breadcrumb | undefined {
  return routeData?.[BREADCRUMB_SYMBOL];
}

export function breadcrumbData(breadcrumb: Breadcrumb) {
  return {
    [BREADCRUMB_SYMBOL]: {
      ...breadcrumb,
    },
  }
}