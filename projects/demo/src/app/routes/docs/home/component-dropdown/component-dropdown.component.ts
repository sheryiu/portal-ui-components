import { Component } from '@angular/core';
import { DropdownModule } from 'phead';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-component-dropdown',
  standalone: true,
  imports: [
    SharedModule,
    DropdownModule,
  ],
  templateUrl: './component-dropdown.component.html',
  styles: ``
})
export class ComponentDropdownComponent {

}
