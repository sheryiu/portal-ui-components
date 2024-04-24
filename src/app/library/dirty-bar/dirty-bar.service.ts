import { EventEmitter, Injectable } from '@angular/core';
import { EffectFn } from '@ngneat/effects-ng';
import { ReplaySubject, tap, throttleTime } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirtyBarService extends EffectFn {

  isDirty$ = new ReplaySubject<boolean>(1);
  isLoading$ = new ReplaySubject<boolean>(1);
  currentEditing$ = new ReplaySubject<string>(1);

  private cancel = new EventEmitter<void>();
  cancel$ = this.cancel.asObservable();
  private save = new EventEmitter<void>();
  save$ = this.save.asObservable();

  markAsDirty() {
    this.isDirty$.next(true);
  }

  markAsPristine() {
    this.isDirty$.next(false);
  }

  markAsLoading() {
    this.isLoading$.next(true);
  }

  markAsStable() {
    this.isLoading$.next(false);
  }

  setCurrentEditing(value: string, markAsDirty?: boolean) {
    this.currentEditing$.next(value);
    this.isDirty$.next(markAsDirty ?? false);
  }

  cancelClick = this.createEffectFn<void>((args$) => args$.pipe(
    throttleTime(1000),
    tap(() => this.cancel.emit()),
  ))

  saveClick = this.createEffectFn<void>((args$) => args$.pipe(
    throttleTime(1000),
    tap(() => this.save.emit()),
  ))
}
