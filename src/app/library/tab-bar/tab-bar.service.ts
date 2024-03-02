import { ElementRef, EventEmitter, Injectable } from '@angular/core';
import { EffectFn } from '@ngneat/effects-ng';
import { BehaviorSubject, ReplaySubject, tap, withLatestFrom } from 'rxjs';

type Tab = {
  id: string;
  label: string;
  elementRef: ElementRef<HTMLElement>;
  intersectionRatio?: number;
}

@Injectable()
export class TabBarService extends EffectFn {
  tabs$ = new BehaviorSubject<Tab[]>([]);
  scroll$ = new ReplaySubject<number>(1);
  scrollTo = new EventEmitter<Tab['elementRef']>();

  registerTab = this.createEffectFn<Tab>(args$ => args$.pipe(
    withLatestFrom(this.tabs$),
    tap(([tab, tabs]) => this.tabs$.next([...tabs, tab])),
  ))

  updateTab = this.createEffectFn<Partial<Tab> & Pick<Tab, 'id'>>(args$ => args$.pipe(
    withLatestFrom(this.tabs$),
    tap(([updateTab, tabs]) => this.tabs$.next(tabs.map(t => t.id === updateTab.id ?
      ({
        ...t,
        ...updateTab,
      }) :
      t
    ))),
  ))
}
