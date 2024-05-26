import { Injectable } from '@angular/core';
import { ReplaySubject, debounceTime, map, scan } from 'rxjs';

@Injectable({
  providedIn: null,
})
export class AccordionService {

  private openTrigger = new ReplaySubject<{ id: string, open: boolean }>(1);
  private collapseOthers = true;
  openedTriggers$ = this.openTrigger.pipe(
    scan((opened, { id, open }) =>
      (this.collapseOthers && open) ?
        [id] :
        (!this.collapseOthers && !open) ?
        [...opened, id] :
        opened.filter(_id => _id !== id),
      [] as string[]),
    debounceTime(0),
  )

  registerTrigger(id: string, isOpened: boolean) {
    this.openTrigger.next({ id, open: isOpened });
    return this.openedTriggers$.pipe(
      map(opened => opened.includes(id)),
    );
  }

  toggleTrigger(id: string, open: boolean) {
    this.openTrigger.next({ id, open });
  }
}
