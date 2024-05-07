import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[pheadTabBarHeaderSupplementary]',
  standalone: true
})
export class TabBarHeaderSupplementaryDirective {
  templateRef = inject(TemplateRef);
}
