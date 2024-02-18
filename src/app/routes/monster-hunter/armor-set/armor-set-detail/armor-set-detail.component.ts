import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { debounceTime, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { ArmorSet } from '../../../../data/armor-set';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorSetService } from '../../../../store/armor-set.service';

@Component({
  selector: 'app-armor-set-detail',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './armor-set-detail.component.html',
  styles: ``
})
export class ArmorSetDetailComponent extends EffectFn {
  private route = inject(ActivatedRoute);
  private service = inject(ArmorSetService);
  private formBuilder = inject(FormBuilder);
  private id$ = this.route.paramMap.pipe(
    map(params => params.get('armorSetId')!),
  )
  data$ = this.id$.pipe(
    switchMap((id) => this.service.getOne(id)),
  )
  formGroup = this.formBuilder.nonNullable.group({
    name: [null as unknown as ArmorSet['name']],
    rarity: [null as unknown as number],
    rank: [null as unknown as ArmorSet['rank']],
  })

  constructor() {
    super();
    this.data$.pipe(
      takeUntilDestroyed(),
    ).subscribe(data => {
      if (data) {
        this.updateForm(data);
      }
    })
  }

  onSave = this.createEffectFn<void>((args$) => args$.pipe(
    withLatestFrom(this.id$),
    debounceTime(0),
    switchMap(([, id]) => this.service.update(id, this.formGroup.getRawValue()))
  ))

  onCancel = this.createEffectFn<void>((args$) => args$.pipe(
    withLatestFrom(this.data$),
    tap(([, data]) => data && this.updateForm(data)),
  ))

  updateForm(data: ArmorSet) {
    this.formGroup.reset({
      name: data.name,
      rarity: data.rarity,
      rank: data.rank,
    })
  }
}
