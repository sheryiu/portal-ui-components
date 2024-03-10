import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { concatMap, debounceTime, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { MultilingualText } from '../../../../data/common';
import { AffinitySkillEffect, AttackSkillEffect, DefenseSkillEffect, ElementalAttackSkillEffect, ResistanceSkillEffect, SkillEffect } from '../../../../data/skill';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { SkillService } from '../../../../store/skill.service';
import { SkillEffectEditComponent } from './skill-effect-edit/skill-effect-edit.component';
import { SkillNewEffectComponent } from './skill-new-effect/skill-new-effect.component';

@Component({
  selector: 'core-skill-level-create',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
    SkillEffectEditComponent,
    SkillNewEffectComponent,
  ],
  templateUrl: './skill-level-create.component.html',
})
export class SkillLevelCreateComponent extends EffectFn {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private id$ = this.route.paramMap.pipe(
    map(params => params.get('skillId')!),
  )
  private service = inject(SkillService);
  data$ = this.id$.pipe(
    switchMap((id) => this.service.getOne(id)),
  )

  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.nonNullable.group({
    level: [null as unknown as number, [Validators.required, Validators.min(1)]],
    isLocked: [false, [Validators.required]],
    description: [null as unknown as MultilingualText, [Validators.required]],
    effects: this.formBuilder.nonNullable.array([] as ReturnType<SkillLevelCreateComponent['newEffectFormGroup']>[], [Validators.required]),
  })

  addEffect(atIndex: number, type: SkillEffect['type']) {
    this.formGroup.controls.effects.insert(
      atIndex,
      this.newEffectFormGroup(type),
    )
  }

  removeEffect(atIndex: number) {
    this.formGroup.controls.effects.removeAt(atIndex)
  }

  onSave = this.createEffectFn<void>(args$ => args$.pipe(
    debounceTime(0),
    withLatestFrom(this.id$, this.data$),
    concatMap(([, id, data]) => {
      const value = this.formGroup.getRawValue();
      return this.service.update(
        id,
        {
          levels: [...(data?.levels ?? []), value as any]
        }
      )
    }),
    tap(() => this.router.navigate(['../'], { relativeTo: this.route }))
  ))

  onCancel = this.createEffectFn<void>(args$ => args$.pipe(
    tap(() => this.router.navigate(['../'], { relativeTo: this.route }))
  ))

  private newEffectFormGroup(type: SkillEffect['type']) {
    switch (type) {
      case 'general':
        return this.formBuilder.nonNullable.group({
          type: ['general'],
          description: [null as unknown as MultilingualText],
        })
      case 'attack':
        return this.formBuilder.nonNullable.group({
          type: ['attack'],
          value: [null as unknown as number],
          calculationType: [null as unknown as AttackSkillEffect['calculationType']],
        })
      case 'affinity':
        return this.formBuilder.nonNullable.group({
          type: ['affinity'],
          value: [null as unknown as number],
          calculationType: [null as unknown as AffinitySkillEffect['calculationType']],
        })
      case 'defense':
        return this.formBuilder.nonNullable.group({
          type: ['defense'],
          value: [null as unknown as number],
          calculationType: [null as unknown as DefenseSkillEffect['calculationType']],
        })
      case 'elementalAttack':
        return this.formBuilder.nonNullable.group({
          type: ['elementalAttack'],
          value: [null as unknown as number],
          calculationType: [null as unknown as ElementalAttackSkillEffect['calculationType']],
          element: [null as unknown as ElementalAttackSkillEffect['element']],
        })
      case 'resistance':
        return this.formBuilder.nonNullable.group({
          type: ['resistance'],
          value: [null as unknown as number],
          calculationType: [null as unknown as ResistanceSkillEffect['calculationType']],
          element: [null as unknown as ResistanceSkillEffect['element']],
        })
    }
  }

}
