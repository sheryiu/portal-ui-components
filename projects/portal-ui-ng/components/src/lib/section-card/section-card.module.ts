import { NgModule } from '@angular/core';
import { SectionCardHeaderDirective } from './section-card-header.directive';
import { SectionCardDirective } from './section-card.directive';

@NgModule({
  declarations: [],
  imports: [
    SectionCardDirective,
    SectionCardHeaderDirective
  ],
  exports: [
    SectionCardDirective,
    SectionCardHeaderDirective
  ]
})
export class SectionCardModule { }
