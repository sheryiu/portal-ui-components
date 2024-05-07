import { Component, Input } from '@angular/core';
import { ArmorSetBonusEffect } from '../../../../../data/armor-set-bonus';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'mhw-armor-set-bonus-skill',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './armor-set-bonus-skill.component.html',
  host: {
    class: 'contents'
  }
})
export class ArmorSetBonusSkillComponent {
  @Input({ required: true }) setBonusEffect!: ArmorSetBonusEffect;
}
