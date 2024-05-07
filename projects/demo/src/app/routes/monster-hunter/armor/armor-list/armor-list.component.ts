import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { Component, ViewChild, computed, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { LayeredContainerComponent, SegmentedOptionsModule, SidebarModule, TableModule, TimeDisplayComponent, provideSearchSuggestions } from 'phead';
import { combineLatest, switchMap, tap } from 'rxjs';
import { Armor } from '../../../../data/armor';
import { ArmorSet } from '../../../../data/armor-set';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorSetService } from '../../../../store/armor-set.service';
import { ArmorService } from '../../../../store/armor.service';
import { LoadingFooterComponent } from '../../utils/loading-footer/loading-footer.component';
import { ArmorListDrawerCreateComponent } from './armor-list-drawer-create/armor-list-drawer-create.component';

@Component({
  selector: 'mhw-armor-list',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    LoadingFooterComponent,
    ArmorListDrawerCreateComponent,
    LayeredContainerComponent,
    ScrollingModule,
    SidebarModule,
    TableModule,
    SegmentedOptionsModule,
    TimeDisplayComponent,
  ],
  templateUrl: './armor-list.component.html',
  providers: [
    provideSearchSuggestions({
      name: 'armorSet',
      source: (str$) => {
        const service = inject(ArmorSetService);
        return str$.pipe(
          switchMap(str => service.list({ name: str ?? undefined }))
        )
      }
    })
  ],
  styles: `
  .core-table-column-createdAt {
    @apply justify-end;
  }
  `
})
export class ArmorListComponent extends EffectFn {
  private service = inject(ArmorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  @ViewChild(CdkVirtualScrollViewport) private scrollViewport?: CdkVirtualScrollViewport;

  data$ = combineLatest({
    filter: toObservable(this.service.mainListFilter$$),
    sort: toObservable(this.service.mainListSort$$),
  }).pipe(
    switchMap(({ filter, sort }) => this.service.list(filter, sort)),
  );
  filterByName$$ = computed(() => this.service.mainListFilter$$()['name']);
  filterByArmorSet$$ = computed(() => this.service.mainListFilter$$()['armorSetId']);
  sortByArmorSet$$ = computed(() => this.service.mainListSort$$()['armorSetId']);
  sortByCreatedAt$$ = computed(() => this.service.mainListSort$$()['createdAt']);

  onHeaderClick() {
    this.router.navigate(['./'], { relativeTo: this.route });
    this.scrollViewport?.scrollToOffset(0, 'smooth');
  }

  onChangeSort = this.createEffectFn<[string, 'asc' | 'desc' | undefined]>(args$ => args$.pipe(
    tap(([sortKey, dir]) => {
      this.service.mainListSort$$.set({
        [sortKey]: dir,
      })
    })
  ))

  onChangeFilter = this.createEffectFn<any>(args$ => args$.pipe(
    tap((filter) => {
      this.service.mainListFilter$$.set(filter)
    }),
    tap(),
  ))

  trackingFn(index: number, item: Armor) {
    return item.id;
  }

  pickArmorSet(item: ArmorSet) {
    return item.id;
  }
}
