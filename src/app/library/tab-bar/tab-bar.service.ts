import { Injectable } from '@angular/core';
import { EffectFn } from '@ngneat/effects-ng';
import { BehaviorSubject, tap, withLatestFrom } from 'rxjs';

type Tab = {
  id: string;
  label: string;
}

@Injectable()
export class TabBarService extends EffectFn {
  tabs$ = new BehaviorSubject<Tab[]>([]);

  registerTab = this.createEffectFn<Tab>(args$ => args$.pipe(
    withLatestFrom(this.tabs$),
    tap(([tab, tabs]) => this.tabs$.next([...tabs, tab])),
  ))

  updateTab = this.createEffectFn<Tab>(args$ => args$.pipe(
    withLatestFrom(this.tabs$),
    tap(([tab, tabs]) => this.tabs$.next(tabs.map(t => t.id === tab.id ?
      tab :
      t))),
  ))
}
