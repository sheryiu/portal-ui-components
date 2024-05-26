import { Directive, ElementRef, computed, inject } from '@angular/core';
import { ScrollspyService } from './scrollspy.service';

@Directive({
  selector: '[puiScrollspyContainer]',
  providers: [
    {
      provide: ScrollspyService,
      deps: [ElementRef],
      useFactory: (element: ElementRef<Element>) => ScrollspyService.create(element.nativeElement),
    }
  ],
  exportAs: 'scrollspy',
})
export class ScrollspyContainerDirective {
  service = inject(ScrollspyService);
  activeId = computed(() => this.service.activeId());
}
