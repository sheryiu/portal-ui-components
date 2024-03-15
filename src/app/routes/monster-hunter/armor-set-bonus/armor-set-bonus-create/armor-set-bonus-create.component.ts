import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EffectFn } from '@ngneat/effects-ng';
import { EMPTY, catchError, concatMap, tap } from 'rxjs';
import { OverlayRefExtra } from '../../../../components/overlay/overlay-ref-extra';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorSetBonusService } from '../../../../store/armor-set-bonus.service';
import { multilingualFromString } from '../../utils';

@Component({
  selector: 'app-armor-set-bonus-create',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './armor-set-bonus-create.component.html',
})
export class ArmorSetBonusCreateComponent extends EffectFn {
  private service = inject(ArmorSetBonusService);

  private overlayRef = inject(OverlayRefExtra);
  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.nonNullable.group({
    name: [null as unknown as string, [Validators.required]],
  })

  onSaveClick = this.createEffectFn<void>(args$ => args$.pipe(
    concatMap(() => {
      const value = this.formGroup.getRawValue();
      return this.service.create({
        name: multilingualFromString(value.name),
      }).pipe(
        catchError(() => EMPTY),
      );
    }),
    tap(() => this.overlayRef.close()),
  ))
}
