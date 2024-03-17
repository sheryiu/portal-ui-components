import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { EMPTY, catchError, concatMap, debounceTime, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorService } from '../../../../store/armor.service';
import { DecorationSlotsEditComponent } from '../../utils/decoration-slots-edit/decoration-slots-edit.component';

@Component({
  selector: 'app-armor-edit-stats',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
    DecorationSlotsEditComponent,
  ],
  templateUrl: './armor-edit-stats.component.html',
  styles: ``
})
export class ArmorEditStatsComponent extends EffectFn {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private id$ = this.route.paramMap.pipe(
    map(params => params.get('armorId')!),
  )
  private service = inject(ArmorService);
  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.nonNullable.group({
    decorationSlots: [null as unknown as number[]],
    baseDef: [null as unknown as number],
    maxLevel: [null as unknown as number],
    maxDef: [null as unknown as number],
    resistance: this.formBuilder.nonNullable.group({
      fire: [null as unknown as number],
      water: [null as unknown as number],
      thunder: [null as unknown as number],
      ice: [null as unknown as number],
      dragon: [null as unknown as number],
    })
  })

  constructor() {
    super()
    this.id$.pipe(
      switchMap(id => this.service.getOne(id)),
      tap(data => {
        this.formGroup.setValue({
          decorationSlots: data?.decorationSlots ?? [],
          baseDef: data?.baseDef! ?? null,
          maxLevel: data?.maxLevel! ?? null,
          maxDef: data?.maxDef! ?? null,
          resistance: {
            fire: data?.resistance?.fire! ?? null,
            water: data?.resistance?.water! ?? null,
            thunder: data?.resistance?.thunder! ?? null,
            ice: data?.resistance?.ice! ?? null,
            dragon: data?.resistance?.dragon! ?? null,
          },
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
