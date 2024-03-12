import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { EMPTY, catchError, concatMap, debounceTime, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { LibraryModule } from '../../../../library/library.module';
import { provideSearchSuggestions } from '../../../../library/search-input/search-input';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorService } from '../../../../store/armor.service';
import { SkillService } from '../../../../store/skill.service';
import { matchFormArraySize } from '../../utils';
import { ArmorSkillEditComponent } from './armor-skill-edit/armor-skill-edit.component';
import { ArmorSkillNewComponent } from './armor-skill-new/armor-skill-new.component';

@Component({
  selector: 'app-armor-edit-skills',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
    ArmorSkillEditComponent,
    ArmorSkillNewComponent,
  ],
  templateUrl: './armor-edit-skills.component.html',
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
export class ArmorEditSkillsComponent extends EffectFn {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private id$ = this.route.paramMap.pipe(
    map(params => params.get('armorId')!),
  )
  private service = inject(ArmorService);
  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.nonNullable.group({
    skills: this.formBuilder.nonNullable.array([] as ReturnType<ArmorEditSkillsComponent['newSkillFormGroup']>[], [Validators.required]),
  })

  constructor() {
    super()
    this.id$.pipe(
      switchMap(id => this.service.getOne(id)),
      tap(data => {
        if (data?.skills) {
          matchFormArraySize(
            this.formGroup.controls.skills,
            data.skills,
            () => this.newSkillFormGroup(),
          )
          this.formGroup.setValue({
            skills: data?.skills ?? [],
          })
        }
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

  addSkill(atIndex: number) {
    this.formGroup.controls.skills.insert(atIndex, this.newSkillFormGroup());
  }

  removeSkill(atIndex: number) {
    this.formGroup.controls.skills.removeAt(atIndex)
  }

  private newSkillFormGroup() {
    return this.formBuilder.nonNullable.group({
      skillId: [null as unknown as string, [Validators.required]],
      levels: [null as unknown as number, [Validators.required, Validators.min(0)]],
    })
  }

}
