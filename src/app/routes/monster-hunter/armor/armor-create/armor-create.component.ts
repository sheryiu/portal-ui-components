import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { franc } from 'franc-min';
import { EMPTY, catchError, concatMap, tap } from 'rxjs';
import { Armor } from '../../../../data/armor';
import { ArmorSet } from '../../../../data/armor-set';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorService } from '../../../../store/armor.service';

@Component({
  selector: 'app-armor-create',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './armor-create.component.html',
  styles: ``
})
export class ArmorCreateComponent extends EffectFn {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(ArmorService);
  private formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.nonNullable.group({
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
    concatMap(() => {
      const value = this.formGroup.getRawValue();
      return this.service.create({
        ...value,
      }).pipe(
        catchError(() => EMPTY),
      );
    }),
  ))

  onCancel = this.createEffectFn<void>((args$) => args$.pipe(
    tap(() => this.router.navigate(['../'], { relativeTo: this.route }))
  ))
}
