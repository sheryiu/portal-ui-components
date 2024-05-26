import { NgModule } from '@angular/core';
import { ScrollspyContainerDirective } from './scrollspy-container.directive';
import { ScrollspyDocumentContainerDirective } from './scrollspy-document-container.directive';
import { ScrollspyTriggerDirective } from './scrollspy-trigger.directive';

@NgModule({
  declarations: [
    ScrollspyContainerDirective,
    ScrollspyDocumentContainerDirective,
    ScrollspyTriggerDirective,
  ],
  imports: [
  ],
  exports: [
    ScrollspyContainerDirective,
    ScrollspyDocumentContainerDirective,
    ScrollspyTriggerDirective,
  ],
})
export class ScrollspyModule { }
