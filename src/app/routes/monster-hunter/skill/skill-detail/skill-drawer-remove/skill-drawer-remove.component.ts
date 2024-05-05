import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { EMPTY, catchError, exhaustMap, filter, tap } from 'rxjs';
import { Skill } from '../../../../../data/skill';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { SkillService } from '../../../../../store/skill.service';

@Component({
  selector: 'mhw-skill-drawer-remove',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
  ],
  templateUrl: './skill-drawer-remove.component.html',
  styles: ``
})
export class SkillDrawerRemoveComponent extends EffectFn {
  @Input({ required: true }) skill!: Skill | null | undefined;
  private service = inject(SkillService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onRemoveClick = this.createEffectFn<void>(args$ => args$.pipe(
    filter(() => this.skill != null),
    exhaustMap(() => this.service.remove(this.skill!.id).pipe(
      catchError(() => EMPTY),
    )),
    tap(() => this.router.navigate(['../'], { relativeTo: this.route, replaceUrl: true }))
  ))
}
