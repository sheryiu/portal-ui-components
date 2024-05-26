import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { LayeredContainerComponent, SidebarModule, TableModule } from 'portal-ui-ng';
import { SharedModule } from '../../../shared/shared.module';
import { ArmorSetBonusService } from '../../../store/armor-set-bonus.service';
import { ArmorSetService } from '../../../store/armor-set.service';
import { ArmorService } from '../../../store/armor.service';
import { SkillService } from '../../../store/skill.service';

@Component({
  selector: 'mhw-home',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    TableModule,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
  private armorService = inject(ArmorService);
  private armorCount$$ = toSignal(this.armorService.count());
  private armorSetService = inject(ArmorSetService);
  private armorSetCount$$ = toSignal(this.armorSetService.count());
  private armorSetBonusService = inject(ArmorSetBonusService);
  private armorSetBonusCount$$ = toSignal(this.armorSetBonusService.count());
  private skillService = inject(SkillService);
  private skillCount$$ = toSignal(this.skillService.count());

  route = inject(ActivatedRoute);

  tables$$ = computed(() => {
    const tables = [
      {
        name: 'Armor',
        route: ['armor'],
        count: this.armorCount$$(),
      },
      {
        name: 'Armor Set',
        route: ['armor-set'],
        count: this.armorSetCount$$(),
      },
      {
        name: 'Armor Set Bonus',
        route: ['armor-set-bonus'],
        count: this.armorSetBonusCount$$(),
      },
      {
        name: 'Skill',
        route: ['skill'],
        count: this.skillCount$$(),
      },
    ]
    return tables;
  })
}
