import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirtyBarService {

  constructor() { }

  markAsDirty() {}

  markAsPristine() {}

  setCurrentEditing(value: string, markAsDirty?: boolean) {}
}
