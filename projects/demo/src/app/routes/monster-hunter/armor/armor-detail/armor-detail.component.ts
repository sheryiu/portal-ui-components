import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AccordionModule, LayeredContainerComponent, SidebarModule, TabBarComponent, TabBarHeaderComponent, filterNonNull } from 'phead';
import { map, switchMap } from 'rxjs';
import { Armor, ArmorPosition } from '../../../../data/armor';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorService } from '../../../../store/armor.service';
import { ArmorPieceLogoComponent } from '../../utils/armor-piece-logo/armor-piece-logo.component';
import { DecorationSlotsDisplayComponent } from '../../utils/decoration-slots-display/decoration-slots-display.component';
import { ArmorDrawerInfoComponent } from './armor-drawer-info/armor-drawer-info.component';
import { ArmorDrawerRemoveComponent } from './armor-drawer-remove/armor-drawer-remove.component';
import { ArmorSetBonusSkillComponent } from './armor-set-bonus-skill/armor-set-bonus-skill.component';
import { ArmorSkillComponent } from './armor-skill/armor-skill.component';

@Component({
  selector: 'app-armor-detail',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    ArmorPieceLogoComponent,
    ArmorSkillComponent,
    ArmorSetBonusSkillComponent,
    DecorationSlotsDisplayComponent,
    ArmorDrawerInfoComponent,
    ArmorDrawerRemoveComponent,
    LayeredContainerComponent,
    SidebarModule,
    ScrollingModule,
    TabBarComponent,
    TabBarHeaderComponent,
    AccordionModule,
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
    filterNonNull(),
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
