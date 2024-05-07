import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { Component, ViewChild, computed, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { AccordionModule, LayeredContainerComponent, PheadOverlayService, SidebarModule, TableModule } from 'phead';
import { combineLatest, switchMap, tap } from 'rxjs';
import { ArmorSetBonus } from '../../../../data/armor-set-bonus';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorSetBonusService } from '../../../../store/armor-set-bonus.service';
import { LoadingFooterComponent } from '../../utils/loading-footer/loading-footer.component';
import { ArmorSetBonusListDrawerCreateComponent } from './armor-set-bonus-list-drawer-create/armor-set-bonus-list-drawer-create.component';

@Component({
  selector: 'app-armor-set-bonus-list',
  standalone: true,
  imports: [
    SharedModule,
    LoadingFooterComponent,
    ArmorSetBonusListDrawerCreateComponent,
    LayeredContainerComponent,
    TableModule,
    SidebarModule,
    ScrollingModule,
    AccordionModule,
  ],
  templateUrl: './armor-set-bonus-list.component.html',
})
export class ArmorSetBonusListComponent extends EffectFn {
  private service = inject(ArmorSetBonusService);
  private overlay = inject(PheadOverlayService);
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

  trackingFn(index: number, item: ArmorSetBonus) {
    return item.id;
  }

}
