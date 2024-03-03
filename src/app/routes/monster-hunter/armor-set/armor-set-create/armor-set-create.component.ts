import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EffectFn } from '@ngneat/effects-ng';
import { franc } from 'franc-min';
import { EMPTY, catchError, concatMap, tap } from 'rxjs';
import { OverlayRefExtra } from '../../../../components/overlay/overlay-ref-extra';
import { ArmorSet } from '../../../../data/armor-set';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorSetService } from '../../../../store/armor-set.service';

@Component({
  selector: 'app-armor-set-create',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './armor-set-create.component.html',
})
export class ArmorSetCreateComponent extends EffectFn {
  private service = inject(ArmorSetService);

  private overlayRef = inject(OverlayRefExtra);
  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.nonNullable.group({
    name: [null as unknown as string, [Validators.required]],
    rarity: [null as unknown as number, [Validators.required]],
  })

  onSaveClick = this.createEffectFn<void>(args$ => args$.pipe(
    concatMap(() => {
      const value = this.formGroup.getRawValue();
      const lang = franc(value.name, { only: ['jpn', 'eng', 'cmn'], minLength: 1 });
      let name: ArmorSet['name'];
      if (lang === 'cmn') name = { zh: value.name };
      else if (lang === 'jpn') name = { jp: value.name };
      else name = { en: value.name };
      return this.service.create({
        name,
        rarity: value.rarity,
        rank: value.rarity >= 9 ? 'iceborne' : 'base',
      }).pipe(
        catchError(() => EMPTY),
      );
    }),
    tap(() => this.overlayRef.close()),
  ))
}
