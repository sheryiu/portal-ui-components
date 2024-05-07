import { Component, EventEmitter, Output } from '@angular/core';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'app-armor-set-bonus-new-effect',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
  ],
  templateUrl: './armor-set-bonus-new-effect.component.html',
  styles: ``
})
export class ArmorSetBonusNewEffectComponent {
  @Output() addEffect = new EventEmitter<void>();

}
