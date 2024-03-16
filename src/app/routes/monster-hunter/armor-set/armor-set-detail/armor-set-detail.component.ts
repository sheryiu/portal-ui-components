import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { debounceTime, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { ArmorSet } from '../../../../data/armor-set';
import { ArmorSetBonus } from '../../../../data/armor-set-bonus';
import { LibraryModule } from '../../../../library/library.module';
import { provideSearchSuggestions } from '../../../../library/search-input/search-input';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorSetBonusService } from '../../../../store/armor-set-bonus.service';
import { ArmorSetService } from '../../../../store/armor-set.service';
import { ArmorSetBonusDataPipe } from '../../utils/data-pipes/armor-set-bonus-data.pipe';

@Component({
  selector: 'app-armor-set-detail',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
    ArmorSetBonusDataPipe,
  ],
  templateUrl: './armor-set-detail.component.html',
  styles: ``,
  providers: [
    provideSearchSuggestions({
      name: 'armorSetBonus',
      source: str$ => {
        const service = inject(ArmorSetBonusService);
        return str$.pipe(
          switchMap(str => service.list({ name: str ?? undefined })),
        )
      }
    })
  ]
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
    setBonusId: [null as unknown as ArmorSet['setBonusId']],
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
      setBonusId: data.setBonusId,
    })
  }

  pickArmorSetBonus(item: ArmorSetBonus) {
    return item.id;
  }
}
