import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { Component, ViewChild, computed, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { AccordionModule, LayeredContainerComponent, SidebarModule, TableModule } from 'phead';
import { combineLatest, switchMap, tap } from 'rxjs';
import { Skill } from '../../../../data/skill';
import { SharedModule } from '../../../../shared/shared.module';
import { SkillService } from '../../../../store/skill.service';
import { LoadingFooterComponent } from '../../utils/loading-footer/loading-footer.component';
import { SkillListDrawerCreateComponent } from './skill-list-drawer-create/skill-list-drawer-create.component';

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [
    SharedModule,
    LoadingFooterComponent,
    SkillListDrawerCreateComponent,
    LayeredContainerComponent,
    SidebarModule,
    TableModule,
    AccordionModule,
    ScrollingModule,
  ],
  templateUrl: './skill-list.component.html',
})
export class SkillListComponent extends EffectFn {
  private service = inject(SkillService);
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
  sortByRarity$$ = computed(() => this.service.mainListSort$$()['name']);

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

  trackingFn(index: number, item: Skill) {
    return item.id;
  }
}
