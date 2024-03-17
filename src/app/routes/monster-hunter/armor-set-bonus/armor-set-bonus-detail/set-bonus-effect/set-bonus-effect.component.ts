import { Component, Input } from '@angular/core';
import { ArmorSetBonusEffect } from '../../../../../data/armor-set-bonus';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { SkillDataPipe } from '../../../utils/data-pipes/skill-data.pipe';

@Component({
  selector: 'mhw-set-bonus-effect',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    SkillDataPipe,
  ],
  templateUrl: './set-bonus-effect.component.html',
  host: {
    class: 'grid grid-cols-subgrid col-span-full'
  }
})
export class SetBonusEffectComponent {
  @Input({ required: true }) setBonusEffect!: ArmorSetBonusEffect;
}
