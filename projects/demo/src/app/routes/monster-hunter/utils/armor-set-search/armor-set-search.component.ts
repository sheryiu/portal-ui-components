import { Component, Injector, Signal, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HoverableDirective, SearchDropdownComponent } from 'phead';
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
  private injector = inject(Injector);
  list$$?: Signal<ArmorSet[] | undefined>;

  constructor() {
    effect(() => {
      // TODO
      this.list$$ = toSignal(this.service.list({ name: this.dropdown.searchTerm$$() }), { injector: this.injector })
    })
  }
}
