import { Component, Input } from '@angular/core';

@Component({
  selector: 'mhw-decoration-slot',
  standalone: true,
  imports: [],
  templateUrl: './decoration-slot.component.html',
})
export class DecorationSlotComponent {
  @Input({ required: true }) size!: 1 | 2 | 3 | 4;
}
