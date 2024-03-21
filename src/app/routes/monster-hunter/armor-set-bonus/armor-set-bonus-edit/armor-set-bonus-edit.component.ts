import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { EMPTY, catchError, concatMap, debounceTime, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { MultilingualText } from '../../../../data/common';
import { LibraryModule } from '../../../../library/library.module';
import { provideSearchSuggestions } from '../../../../library/search-input/search-input';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorSetBonusService } from '../../../../store/armor-set-bonus.service';
import { SkillService } from '../../../../store/skill.service';
import { matchFormArraySize } from '../../utils';
import { ArmorSetBonusEditEffectComponent } from './armor-set-bonus-edit-effect/armor-set-bonus-edit-effect.component';
import { ArmorSetBonusNewEffectComponent } from './armor-set-bonus-new-effect/armor-set-bonus-new-effect.component';

@Component({
  selector: 'app-armor-set-bonus-edit',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
    ArmorSetBonusNewEffectComponent,
    ArmorSetBonusEditEffectComponent,
  ],
  templateUrl: './armor-set-bonus-edit.component.html',
  styles: ``,
  providers: [
    provideSearchSuggestions({
      name: 'skill',
      source: (str$) => {
        const service = inject(SkillService);
        return str$.pipe(
          switchMap((searchStr) => service.list({ name: searchStr ?? undefined }))
        )
      }
    })
  ]
})
export class ArmorSetBonusEditComponent extends EffectFn {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private id$ = this.route.paramMap.pipe(
    map(params => params.get('armorSetBonusId')!),
  )
  private service = inject(ArmorSetBonusService);
  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.nonNullable.group({
    name: [null as unknown as MultilingualText, [Validators.required]],
    effects: this.formBuilder.nonNullable.array([] as ReturnType<ArmorSetBonusEditComponent['createNewEffectFormGroup']>[]),
  })

  constructor() {
    super()
    this.id$.pipe(
      switchMap(id => this.service.getOne(id)),
      tap(data => {
        if (data?.effects) {
          matchFormArraySize(
            this.formGroup.controls.effects,
            data.effects,
            () => this.createNewEffectFormGroup(),
          )
        }
        this.formGroup.setValue({
          name: data?.name! ?? null,
          effects: data?.effects ?? [],
        })
      }),
      takeUntilDestroyed(),
    ).subscribe()
  }

  addEffect(atIndex: number) {
    this.formGroup.controls.effects.insert(atIndex, this.createNewEffectFormGroup());
    this.formGroup.controls.effects.markAsDirty();
  }

  removeEffect(atIndex: number) {
    this.formGroup.controls.effects.removeAt(atIndex);
    this.formGroup.controls.effects.markAsDirty();
  }

  onSave = this.createEffectFn<void>((args$) => args$.pipe(
    debounceTime(0),
    withLatestFrom(this.id$),
    concatMap(([, id]) => {
      const value = this.formGroup.getRawValue();
      return this.service.update(
        id,
        {
          ...value,
        }
      ).pipe(
        catchError(() => EMPTY),
      );
    }),
    tap(() => this.router.navigate(['../'], { relativeTo: this.route, replaceUrl: true }))
  ))

  onCancel = this.createEffectFn<void>((args$) => args$.pipe(
    tap(() => this.router.navigate(['../'], { relativeTo: this.route, replaceUrl: true }))
  ))

  private createNewEffectFormGroup() {
    return this.formBuilder.nonNullable.group({
      skillId: [null as unknown as string, [Validators.required]],
      requiredNumberOfParts: [null as unknown as number, [Validators.required]],
    })
  }

}
