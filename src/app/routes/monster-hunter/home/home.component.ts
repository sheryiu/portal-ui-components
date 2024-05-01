import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LibraryModule } from '../../../library/library.module';
import { SharedModule } from '../../../shared/shared.module';
import { ArmorSetBonusService } from '../../../store/armor-set-bonus.service';
import { ArmorSetService } from '../../../store/armor-set.service';
import { ArmorService } from '../../../store/armor.service';

@Component({
  selector: 'mhw-home',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
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
    ]
    return tables;
  })
}
