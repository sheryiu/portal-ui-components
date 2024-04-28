import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, ViewChild, computed, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { combineLatest, switchMap, tap } from 'rxjs';
import { ArmorSet } from '../../../../data/armor-set';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorSetService } from '../../../../store/armor-set.service';
import { LoadingFooterComponent } from '../../utils/loading-footer/loading-footer.component';
import { ArmorSetCreateComponent } from '../shared/armor-set-create/armor-set-create.component';

@Component({
  selector: 'app-armor-set-list',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    LoadingFooterComponent,
    ArmorSetCreateComponent,
  ],
  templateUrl: './armor-set-list.component.html',
})
export class ArmorSetListComponent extends EffectFn {
  private service = inject(ArmorSetService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  @ViewChild(CdkVirtualScrollViewport) private scrollViewport?: CdkVirtualScrollViewport;

  data$ = combineLatest({
    filter: toObservable(this.service.mainListFilter$$),
    sort: toObservable(this.service.mainListSort$$),
  }).pipe(
    switchMap(({ filter, sort }) => this.service.list(filter, sort))
  );
  filterByName$$ = computed(() => this.service.mainListFilter$$()['name']);
  sortByRarity$$ = computed(() => this.service.mainListSort$$()['rarity']);

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

  trackingFn(index: number, item: ArmorSet) {
    return item.id;
  }
}
