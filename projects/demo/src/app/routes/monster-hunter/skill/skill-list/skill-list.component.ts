import { A11yModule } from '@angular/cdk/a11y';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { Component, ViewChild, computed, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { AccordionModule, LayeredContainerComponent, SidebarModule, TableModule } from 'portal-ui-ng';
import { combineLatest, switchMap, tap } from 'rxjs';
import { Skill } from '../../../../data/skill';
import { SharedModule } from '../../../../shared/shared.module';
import { SkillService } from '../../../../store/skill.service';
import { DrawerCreateComponent } from './drawer-create/drawer-create.component';

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [
    SharedModule,
    DrawerCreateComponent,
    LayeredContainerComponent,
    SidebarModule,
    TableModule,
    AccordionModule,
    ScrollingModule,
    A11yModule,
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
