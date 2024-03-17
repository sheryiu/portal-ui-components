import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { map, switchMap } from 'rxjs';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorSetBonusService } from '../../../../store/armor-set-bonus.service';
import { SetBonusEffectComponent } from './set-bonus-effect/set-bonus-effect.component';

@Component({
  selector: 'app-armor-set-bonus-detail',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    RouterLink,
    SetBonusEffectComponent,
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
