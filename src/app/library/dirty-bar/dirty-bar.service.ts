import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirtyBarService {

  isDirty$ = new ReplaySubject<boolean>(1);

  constructor() { }

  markAsDirty() {
    this.isDirty$.next(true);
  }

  markAsPristine() {
    this.isDirty$.next(false);
  }

  setCurrentEditing(value: string, markAsDirty?: boolean) {
    this.isDirty$.next(markAsDirty ?? false);
  }
}
