import { InjectionToken } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Observable } from 'rxjs';

const BREADCRUMB_SYMBOL = Symbol('breadcrumb');

type MappedInstanceType<T extends readonly any[]> = {
  [Key in keyof T]: T[Key] extends InjectionToken<infer U> ? U : InstanceType<T[Key]>
}

export type Breadcrumb<Deps extends readonly any[] = any[]> = {
  title: string;
  tooltip?: string | null;
} | {
  deps?: Deps;
  titleFn: (route: ActivatedRoute, ...deps: MappedInstanceType<Deps>) => Observable<string> | string;
  tooltipFn?: (route: ActivatedRoute, ...deps: MappedInstanceType<Deps>) => Observable<string> | string;
};

export function getBreadcrumb(routeData: Data): (Breadcrumb & { id: Symbol }) | undefined {
  return routeData?.[BREADCRUMB_SYMBOL];
}

export function breadcrumb<Deps extends readonly any[]>(breadcrumb: Breadcrumb<Deps>) {
  return {
    [BREADCRUMB_SYMBOL]: {
      id: Symbol(),
      ...breadcrumb,
    },
  }
}