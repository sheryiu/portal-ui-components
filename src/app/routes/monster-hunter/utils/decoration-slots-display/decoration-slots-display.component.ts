import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { DecorationSlotComponent } from '../decoration-slot/decoration-slot.component';

@Component({
  selector: 'mhw-decoration-slots-display',
  standalone: true,
  imports: [
    SharedModule,
    DecorationSlotComponent,
  ],
  templateUrl: './decoration-slots-display.component.html',
})
export class DecorationSlotsDisplayComponent {
  @Input({ required: true }) slots!: number[] | null | undefined;

}
