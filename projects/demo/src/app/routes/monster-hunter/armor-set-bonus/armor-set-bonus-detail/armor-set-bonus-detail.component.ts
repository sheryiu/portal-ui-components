import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { LayeredContainerComponent, SidebarModule } from 'portal-ui-ng';
import { map, switchMap } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorSetBonusService } from '../../../../store/armor-set-bonus.service';

@Component({
  selector: 'app-armor-set-bonus-detail',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    LayeredContainerComponent,
    SidebarModule,
    ScrollingModule,
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
