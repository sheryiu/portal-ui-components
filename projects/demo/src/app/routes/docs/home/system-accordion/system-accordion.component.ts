import { Component } from '@angular/core';
import { AccordionModule, DividerComponent } from 'phead';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-system-accordion',
  standalone: true,
  imports: [
    SharedModule,
    AccordionModule,
    DividerComponent,
  ],
  templateUrl: './system-accordion.component.html',
  styles: ``
})
export class SystemAccordionComponent {

}
