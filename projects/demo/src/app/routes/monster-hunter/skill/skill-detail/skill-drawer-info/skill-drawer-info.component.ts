import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccordionModule, SidebarModule, TimeDisplayComponent } from 'phead';
import { Skill } from '../../../../../data/skill';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'mhw-skill-drawer-info',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    TimeDisplayComponent,
    AccordionModule,
    SidebarModule,
  ],
  templateUrl: './skill-drawer-info.component.html',
  styles: ``
})
export class SkillDrawerInfoComponent {
  @Input() skill!: Skill | null | undefined;

}
