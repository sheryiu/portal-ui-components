import { Component, Input } from '@angular/core';
import { ArmorSkill } from '../../../../../data/armor';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'mhw-armor-skill',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './armor-skill.component.html',
  host: {
    class: 'contents'
  }
})
export class ArmorSkillComponent {
  @Input({ required: true }) armorSkill!: ArmorSkill;
}
