import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[pheadTabBarHeaderSupplementary]',
})
export class TabBarHeaderSupplementaryDirective {
  templateRef = inject(TemplateRef);
}
