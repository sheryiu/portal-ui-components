import { Component, Input } from '@angular/core';
import { ArmorSetBonusEffect } from '../../../../../data/armor-set-bonus';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'mhw-set-bonus-effect',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './set-bonus-effect.component.html',
  host: {
    class: 'grid grid-cols-subgrid col-span-full'
  }
})
export class SetBonusEffectComponent {
  @Input({ required: true }) setBonusEffect!: ArmorSetBonusEffect;
}
