import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { filterNonNull } from '../../../../components/utils/filter-non-null';
import { Armor, ArmorPosition } from '../../../../data/armor';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorService } from '../../../../store/armor.service';
import { ArmorPieceLogoComponent } from '../../utils/armor-piece-logo/armor-piece-logo.component';
import { ArmorSetBonusDataPipe } from '../../utils/data-pipes/armor-set-bonus-data.pipe';
import { ArmorSetDataPipe } from '../../utils/data-pipes/armor-set-data.pipe';
import { DecorationSlotsDisplayComponent } from '../../utils/decoration-slots-display/decoration-slots-display.component';
import { nonNullable } from '../../utils/non-nullable';
import { ArmorDrawerInfoComponent } from './armor-drawer-info/armor-drawer-info.component';
import { ArmorDrawerRemoveComponent } from './armor-drawer-remove/armor-drawer-remove.component';
import { ArmorSetBonusSkillComponent } from './armor-set-bonus-skill/armor-set-bonus-skill.component';
import { ArmorSkillComponent } from './armor-skill/armor-skill.component';

@Component({
  selector: 'app-armor-detail',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    ArmorSetDataPipe,
    RouterLink,
    ArmorSetDataPipe,
    ArmorSetBonusDataPipe,
    ArmorPieceLogoComponent,
    ArmorSkillComponent,
    ArmorSetBonusSkillComponent,
    DecorationSlotsDisplayComponent,
    ArmorDrawerInfoComponent,
    ArmorDrawerRemoveComponent
  ],
  templateUrl: './armor-detail.component.html',
  styles: ``
})
export class ArmorDetailComponent {
  private route = inject(ActivatedRoute);
  private service = inject(ArmorService);
  private id$ = this.route.paramMap.pipe(
    map(params => params.get('armorId')!),
  )
  data$ = this.id$.pipe(
    switchMap((id) => this.service.getOne(id)),
  )
  headerImage$ = this.data$.pipe(
    map(data => data?.image ?
      URL.createObjectURL(data.image) :
      'https://www.monsterhunter.com/world/images/top/img_intro01.jpg'),
    map(url => `url(${ url })`),
  )
  positionsInArmorSet$ = this.data$.pipe(
    map(data => data?.armorSetId),
    nonNullable(),
    switchMap(armorSetId => this.service.list({ armorSetId })),
    filterNonNull(),
    map(armors => ({
      helm: armors.find(a => a.position === ArmorPosition.Helm)?.id,
      chest: armors.find(a => a.position === ArmorPosition.Chest)?.id,
      arms: armors.find(a => a.position === ArmorPosition.Arms)?.id,
      waist: armors.find(a => a.position === ArmorPosition.Waist)?.id,
      legs: armors.find(a => a.position === ArmorPosition.Legs)?.id,
    } as Record<ArmorPosition, Armor['id']>))
  )
  armorPositionList: ArmorPosition[] = [ArmorPosition.Helm, ArmorPosition.Chest, ArmorPosition.Arms, ArmorPosition.Waist, ArmorPosition.Legs];

}
