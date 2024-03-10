import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { EMPTY, catchError, concatMap, debounceTime, map, tap, withLatestFrom } from 'rxjs';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorService } from '../../../../store/armor.service';

@Component({
  selector: 'app-armor-edit-skills',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './armor-edit-skills.component.html',
  styles: ``
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
  })

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
