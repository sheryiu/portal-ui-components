import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SkillEffect, SkillLevel } from '../../../../../data/skill';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';

const SORT_ORDER: SkillEffect['type'][] = [
  'general',
  'attack',
  'affinity',
  'defense',
  'resistance',
];

@Component({
  selector: 'core-skill-level',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule
  ],
  templateUrl: './skill-level.component.html',
  host: {
    class: 'grid col-span-full grid-cols-subgrid'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillLevelComponent {
  @Input() skillLevel!: SkillLevel;
  @Input() showRemoveButton?: boolean;
  @Output() removeLevel = new EventEmitter<void>();

  get effects() {
    return this.skillLevel.effects?.toSorted((a, b) => {
      return SORT_ORDER.indexOf(a.type) - SORT_ORDER.indexOf(b.type);
    })
  }
}
