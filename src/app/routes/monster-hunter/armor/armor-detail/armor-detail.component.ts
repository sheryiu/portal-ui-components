import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { ArmorSetDataPipe } from '../../../../data-pipes/armor-set-data.pipe';
import { SkillDataPipe } from '../../../../data-pipes/skill-data.pipe';
import { Armor, ArmorPosition } from '../../../../data/armor';
import { LibraryModule } from '../../../../library/library.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorService } from '../../../../store/armor.service';
import { ArmorPieceLogoComponent } from '../../utils/armor-piece-logo/armor-piece-logo.component';
import { nonNullable } from '../../utils/non-nullable';

@Component({
  selector: 'app-armor-detail',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    ArmorSetDataPipe,
    RouterLink,
    SkillDataPipe,
    ArmorPieceLogoComponent,
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
    map(url => `linear-gradient(to bottom, var(--tw-gradient-stops)), url(${ url })`),
  )
  positionsInArmorSet$ = this.data$.pipe(
    map(data => data?.armorSetId),
    nonNullable(),
    switchMap(armorSetId => this.service.list({ armorSetId })),
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
