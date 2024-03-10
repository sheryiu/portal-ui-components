import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { EMPTY, catchError, concatMap, debounceTime, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { MultilingualText } from '../../../../data/common';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { SkillService } from '../../../../store/skill.service';

@Component({
  selector: 'app-skill-edit-details',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './skill-edit-details.component.html',
  styles: ``
})
export class SkillEditDetailsComponent extends EffectFn {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private id$ = this.route.paramMap.pipe(
    map(params => params.get('skillId')!),
  )
  private service = inject(SkillService);
  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.nonNullable.group({
    name: [null as unknown as MultilingualText, [Validators.required]],
    description: [null as unknown as MultilingualText, [Validators.required]],
    color: [null as unknown as string, [Validators.required]],
  })

  constructor() {
    super()
    this.id$.pipe(
      switchMap(id => this.service.getOne(id)),
      tap(data => {
        this.formGroup.setValue({
          name: data?.name! ?? null,
          description: data?.description! ?? null,
          color: data?.color! ?? null,
        })
      }),
      takeUntilDestroyed(),
    ).subscribe()
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
    tap(() => this.router.navigate(['../'], { relativeTo: this.route }))
  ))

  onCancel = this.createEffectFn<void>((args$) => args$.pipe(
    tap(() => this.router.navigate(['../'], { relativeTo: this.route }))
  ))

}
