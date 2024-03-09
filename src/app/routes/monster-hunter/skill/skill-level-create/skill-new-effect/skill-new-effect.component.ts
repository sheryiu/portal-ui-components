import { Component, EventEmitter, Output } from '@angular/core';
import { SkillEffect } from '../../../../../data/skill';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'core-skill-new-effect',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
  ],
  templateUrl: './skill-new-effect.component.html',
})
export class SkillNewEffectComponent {

  @Output() addEffect = new EventEmitter<SkillEffect['type']>();

}
