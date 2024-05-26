import { NgModule } from '@angular/core';
import { AccordionContainerDirective } from './accordion-container.directive';
import { AccordionTriggerDirective } from './accordion-trigger.directive';
import { AccordionComponent } from './accordion.component';

@NgModule({
  declarations: [],
  imports: [
    AccordionComponent,
    AccordionTriggerDirective,
    AccordionContainerDirective,
  ],
  exports: [
    AccordionComponent,
    AccordionTriggerDirective,
    AccordionContainerDirective,
  ]
})
export class AccordionModule { }
