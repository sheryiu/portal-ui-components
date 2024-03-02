import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { EMPTY, catchError, concatMap, debounceTime, switchMap, tap } from 'rxjs';
import { ArmorSetDataPipe } from '../../../../data-pipes/armor-set-data.pipe';
import { Armor } from '../../../../data/armor';
import { ArmorSet } from '../../../../data/armor-set';
import { LibraryModule } from '../../../../library/library.module';
import { provideSearchSuggestions } from '../../../../library/search-input/search-input';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorSetService } from '../../../../store/armor-set.service';
import { ArmorService } from '../../../../store/armor.service';

@Component({
  selector: 'app-armor-create',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
    ArmorSetDataPipe,
  ],
  templateUrl: './armor-create.component.html',
  styles: ``,
  providers: [
    provideSearchSuggestions({
      name: 'armorSet',
      source: (str$) => {
        const service = inject(ArmorSetService);
        return str$.pipe(
          switchMap(str => service.list({ name: str ?? undefined }))
        )
      }
    })
  ]
})
export class ArmorCreateComponent extends EffectFn {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(ArmorService);
  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.nonNullable.group({
    image: [null as unknown as Armor['image']],
    name: [null as unknown as Armor['name']],
    armorSetId: [null as unknown as string, [Validators.required]],
    position: [null as unknown as Armor['position'], [Validators.required]],
    rarity: [null as unknown as number, [Validators.required]],
    rank: [null as unknown as Armor['rank'], [Validators.required]],
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

  onSave = this.createEffectFn<void>((args$) => args$.pipe(
    debounceTime(0),
    concatMap(() => {
      const value = this.formGroup.getRawValue();
      return this.service.create({
        ...value,
      }).pipe(
        catchError(() => EMPTY),
      );
    }),
    tap((id) => this.router.navigate(['../', id], { relativeTo: this.route }))
  ))

  onCancel = this.createEffectFn<void>((args$) => args$.pipe(
    tap(() => this.router.navigate(['../'], { relativeTo: this.route }))
  ))

  pickArmorSet(item: ArmorSet) {
    return item.id;
  }
}
