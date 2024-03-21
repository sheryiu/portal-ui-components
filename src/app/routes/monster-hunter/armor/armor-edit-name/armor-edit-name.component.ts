import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { EMPTY, catchError, concatMap, debounceTime, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { Armor } from '../../../../data/armor';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorService } from '../../../../store/armor.service';

@Component({
  selector: 'app-armor-edit-name',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './armor-edit-name.component.html',
  styles: ``
})
export class ArmorEditNameComponent extends EffectFn {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private id$ = this.route.paramMap.pipe(
    map(params => params.get('armorId')!),
  )
  private service = inject(ArmorService);
  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.nonNullable.group({
    image: [null as unknown as Armor['image']],
    name: [null as unknown as Armor['name'], [Validators.required]],
  })

  constructor() {
    super()
    this.id$.pipe(
      switchMap(id => this.service.getOne(id)),
      tap(data => {
        this.formGroup.setValue({
          image: data?.image! ?? null,
          name: data?.name! ?? null,
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
    tap(() => this.router.navigate(['../'], { relativeTo: this.route, replaceUrl: true }))
  ))

  onCancel = this.createEffectFn<void>((args$) => args$.pipe(
    tap(() => this.router.navigate(['../'], { relativeTo: this.route, replaceUrl: true }))
  ))
}