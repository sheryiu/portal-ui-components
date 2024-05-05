import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Skill } from '../../../../../data/skill';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'mhw-skill-drawer-info',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    RouterLink,
  ],
  templateUrl: './skill-drawer-info.component.html',
  styles: ``
})
export class SkillDrawerInfoComponent {
  @Input() skill!: Skill | null | undefined;

}
