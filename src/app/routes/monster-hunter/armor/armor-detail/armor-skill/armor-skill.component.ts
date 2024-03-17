import { Component, Input } from '@angular/core';
import { ArmorSkill } from '../../../../../data/armor';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { SkillDataPipe } from '../../../utils/data-pipes/skill-data.pipe';

@Component({
  selector: 'mhw-armor-skill',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    SkillDataPipe,
  ],
  templateUrl: './armor-skill.component.html',
  host: {
    class: 'contents'
  }
})
export class ArmorSkillComponent {
  @Input({ required: true }) armorSkill!: ArmorSkill;
}
