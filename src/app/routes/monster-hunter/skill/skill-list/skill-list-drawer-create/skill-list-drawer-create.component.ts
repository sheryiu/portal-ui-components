import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EffectFn } from '@ngneat/effects-ng';
import { EMPTY, catchError, exhaustMap, filter, tap } from 'rxjs';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { SkillCreateInput, SkillService } from '../../../../../store/skill.service';

@Component({
  selector: 'mhw-skill-list-drawer-create',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
  ],
  templateUrl: './skill-list-drawer-create.component.html',
  styles: ``
})
export class SkillListDrawerCreateComponent extends EffectFn {
  private service = inject(SkillService);
  private builder = inject(FormBuilder);
  formControl = this.builder.control<SkillCreateInput | null>(null);

  onSubmit = this.createEffectFn<void>(args$ => args$.pipe(
    filter(() => this.formControl.value != null),
    exhaustMap(() =>
      this.service.create(this.formControl.value!).pipe(
        catchError(() => EMPTY),
      )
    ),
    tap(() => this.formControl.reset()),
  ))
}
