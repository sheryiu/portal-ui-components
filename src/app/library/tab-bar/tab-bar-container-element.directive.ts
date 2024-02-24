import { Directive } from '@angular/core';
import { TabBarService } from './tab-bar.service';

@Directive({
  selector: '[coreTabBarContainerElement]',
  standalone: true,
  providers: [
    TabBarService,
  ]
})
export class TabBarContainerElementDirective {

  constructor() { }

}
