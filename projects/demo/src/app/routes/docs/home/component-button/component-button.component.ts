import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-component-button',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './component-button.component.html',
  styles: ``
})
export class ComponentButtonComponent {

}
