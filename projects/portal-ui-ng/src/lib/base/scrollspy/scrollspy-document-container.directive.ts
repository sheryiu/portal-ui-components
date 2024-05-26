import { DOCUMENT } from '@angular/common';
import { Directive, computed, inject } from '@angular/core';
import { ScrollspyService } from './scrollspy.service';

@Directive({
  selector: '[puiScrollspyDocumentContainer]',
  providers: [
    {
      provide: ScrollspyService,
      deps: [DOCUMENT],
      useFactory: (document: Document) => ScrollspyService.create(document.documentElement),
    }
  ],
  exportAs: 'scrollspy',
})
export class ScrollspyDocumentContainerDirective {
  service = inject(ScrollspyService);
  activeId = computed(() => this.service.activeId());
}
