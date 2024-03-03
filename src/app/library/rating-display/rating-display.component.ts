import { Component, Input, numberAttribute } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'core-rating-display',
  standalone: true,
  imports: [
    SharedModule
  ],
  host: {
    class: 'core-rating-display',
  },
  templateUrl: './rating-display.component.html',
})
export class RatingDisplayComponent {
  @Input({ required: true, transform: numberAttribute }) value!: number | null | undefined;
}
