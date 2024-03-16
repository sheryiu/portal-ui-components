import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { debounceTime, map, switchMap, tap, withLatestFrom } from 'rxjs';
import { ArmorSet } from '../../../../data/armor-set';
import { ArmorSetBonus } from '../../../../data/armor-set-bonus';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorSetBonusService } from '../../../../store/armor-set-bonus.service';

@Component({
  selector: 'app-armor-set-bonus-detail',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    RouterLink,
  ],
  templateUrl: './armor-set-bonus-detail.component.html',
  styles: ``
})
export class ArmorSetBonusDetailComponent extends EffectFn {
  private route = inject(ActivatedRoute);
  private service = inject(ArmorSetBonusService);
  private id$ = this.route.paramMap.pipe(
    map(params => params.get('armorSetBonusId')!),
  )
  data$ = this.id$.pipe(
    switchMap((id) => this.service.getOne(id)),
  )
}
