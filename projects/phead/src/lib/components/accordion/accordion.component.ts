import { Component } from '@angular/core';
import { AccordionService } from './accordion.service';

@Component({
  selector: 'phead-accordion',
  standalone: true,
  imports: [],
  template: '<ng-content></ng-content>',
  providers: [
    AccordionService,
  ]
})
export class AccordionComponent {

}
