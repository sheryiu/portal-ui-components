import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, ViewChild, computed, inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { combineLatest, switchMap, tap } from 'rxjs';
import { OverlayService } from '../../../../components/overlay/overlay.service';
import { Skill } from '../../../../data/skill';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { SkillService } from '../../../../store/skill.service';
import { ArmorSetCreateComponent } from '../../armor-set/armor-set-create/armor-set-create.component';
import { SkillCreateComponent } from '../skill-create/skill-create.component';

@Component({
  selector: 'app-skill-list',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
  ],
  templateUrl: './skill-list.component.html',
})
export class SkillListComponent extends EffectFn {
  private service = inject(SkillService);
  private overlay = inject(OverlayService);
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

  onNewClick = this.createEffectFn<HTMLElement>(args$ => args$.pipe(
    tap((button) => {
      this.overlay.open(SkillCreateComponent, {
        positionStrategy: this.overlay.position().flexibleConnectedTo(button)
          .withPositions([
            { overlayX: 'end', overlayY: 'top', originX: 'end', originY: 'top' },
          ]),
        scrollStrategy: this.overlay.scrollStrategies.reposition(),
      })
    })
  ));

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
