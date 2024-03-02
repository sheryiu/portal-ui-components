import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[coreTabBarHeaderSupplementary]',
  standalone: true
})
export class TabBarHeaderSupplementaryDirective {
  templateRef = inject(TemplateRef);
}
