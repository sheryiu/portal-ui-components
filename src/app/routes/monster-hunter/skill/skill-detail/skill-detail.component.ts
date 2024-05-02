import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { concatMap, map, switchMap, withLatestFrom } from 'rxjs';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { SkillService } from '../../../../store/skill.service';
import { SkillLevelComponent } from './skill-level/skill-level.component';

@Component({
  selector: 'app-skill-detail',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    RouterLink,
    SkillLevelComponent,
  ],
  templateUrl: './skill-detail.component.html',
  styles: ``
})
export class SkillDetailComponent extends EffectFn {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(SkillService);
  private id$ = this.route.paramMap.pipe(
    map(params => params.get('skillId')!),
  )
  data$ = this.id$.pipe(
    switchMap((id) => this.service.getOne(id)),
    map(data => ({
      ...data,
      levels: data?.levels?.toSorted((a, b) => a.level < b.level ? -1 : a.level > b.level ? 1 : 0)
    }))
  )
  @ViewChild(CdkVirtualScrollViewport) private scrollViewport?: CdkVirtualScrollViewport;

  onHeaderClick() {
    this.router.navigate(['./'], { relativeTo: this.route });
    this.scrollViewport?.scrollToOffset(0, 'smooth');
  }

  onRemoveLevelClick = this.createEffectFn<number>(args$ => args$.pipe(
    withLatestFrom(this.id$, this.data$),
    concatMap(([removeLevel, id, data]) => {
      return this.service.update(
        id,
        {
          levels: data?.levels?.filter((level) => level.level !== removeLevel),
        }
      )
    }),
  ))
}
