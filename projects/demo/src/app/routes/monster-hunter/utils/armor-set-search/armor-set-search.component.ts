import { Component, Signal, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HoverableDirective, SearchDropdownComponent } from 'portal-ui-ng';
import { map, switchMap } from 'rxjs';
import { ArmorSet } from '../../../../data/armor-set';
import { ArmorSetService } from '../../../../store/armor-set.service';

@Component({
  selector: 'demo-armor-set-search',
  standalone: true,
  imports: [
    HoverableDirective,
  ],
  templateUrl: './armor-set-search.component.html',
})
export class ArmorSetSearchComponent {
  private dropdown = inject(SearchDropdownComponent, { skipSelf: true, host: true });
  private service = inject(ArmorSetService);
  list$$?: Signal<ArmorSet[] | undefined>;

  canUnset = input<boolean>(false);

  constructor() {
    this.list$$ = toSignal(
      toObservable(this.dropdown.searchTerm$$).pipe(
        switchMap(term => this.service.list({ name: term })),
        map(list => list.slice(0, 10))
      )
    )
  }

  onSelect(value: string | null) {
    this.dropdown.selectValue(value);
  }
}
