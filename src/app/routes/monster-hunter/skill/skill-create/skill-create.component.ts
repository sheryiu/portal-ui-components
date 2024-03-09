import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EffectFn } from '@ngneat/effects-ng';
import { franc } from 'franc-min';
import { EMPTY, catchError, concatMap, tap } from 'rxjs';
import { OverlayRefExtra } from '../../../../components/overlay/overlay-ref-extra';
import { Skill } from '../../../../data/skill';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { SkillService } from '../../../../store/skill.service';

@Component({
  selector: 'app-skill-create',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './skill-create.component.html',
})
export class SkillCreateComponent extends EffectFn {
  private service = inject(SkillService);

  private overlayRef = inject(OverlayRefExtra);
  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.nonNullable.group({
    name: [null as unknown as string, [Validators.required]],
    color: [null as unknown as string, [Validators.required]],
  })

  onSaveClick = this.createEffectFn<void>(args$ => args$.pipe(
    concatMap(() => {
      const value = this.formGroup.getRawValue();
      const lang = franc(value.name, { only: ['jpn', 'eng', 'cmn'], minLength: 1 });
      let name: Skill['name'];
      if (lang === 'cmn') name = { zh: value.name };
      else if (lang === 'jpn') name = { jp: value.name };
      else name = { en: value.name };
      return this.service.create({
        name,
        color: value.color,
      }).pipe(
        catchError(() => EMPTY),
      );
    }),
    tap(() => this.overlayRef.close()),
  ))
}
