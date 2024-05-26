import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { AccordionModule, SidebarModule } from 'portal-ui-ng';
import { EMPTY, catchError, exhaustMap, filter, tap } from 'rxjs';
import { Skill } from '../../../../../data/skill';
import { SharedModule } from '../../../../../shared/shared.module';
import { SkillService } from '../../../../../store/skill.service';

@Component({
  selector: 'mhw-drawer-remove',
  standalone: true,
  imports: [
    SharedModule,
    SidebarModule,
    AccordionModule,
  ],
  templateUrl: './drawer-remove.component.html',
  styles: ``
})
export class DrawerRemoveComponent extends EffectFn {
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
