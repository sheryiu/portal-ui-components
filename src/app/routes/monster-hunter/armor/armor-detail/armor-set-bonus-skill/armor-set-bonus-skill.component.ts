import { Component, Input } from '@angular/core';
import { ArmorSetBonusEffect } from '../../../../../data/armor-set-bonus';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { SkillDataPipe } from '../../../utils/data-pipes/skill-data.pipe';

@Component({
  selector: 'mhw-armor-set-bonus-skill',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    SkillDataPipe,
  ],
  templateUrl: './armor-set-bonus-skill.component.html',
  host: {
    class: 'contents'
  }
})
export class ArmorSetBonusSkillComponent {
  @Input({ required: true }) setBonusEffect!: ArmorSetBonusEffect;
}
