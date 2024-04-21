import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'core-dirty-bar',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './dirty-bar.component.html',
  host: {
    class: 'core-dirty-bar'
  }
})
export class DirtyBarComponent {

}
