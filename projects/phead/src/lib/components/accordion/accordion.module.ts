import { NgModule } from '@angular/core';
import { AccordionTriggerDirective } from './accordion-trigger.directive';
import { AccordionComponent } from './accordion.component';

@NgModule({
  declarations: [],
  imports: [
    AccordionComponent,
    AccordionTriggerDirective,
  ],
  exports: [
    AccordionComponent,
    AccordionTriggerDirective,
  ]
})
export class AccordionModule { }
