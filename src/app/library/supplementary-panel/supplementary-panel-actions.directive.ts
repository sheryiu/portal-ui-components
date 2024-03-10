import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[coreSupplementaryPanelActions]',
  standalone: true
})
export class SupplementaryPanelActionsDirective {
  templateRef = inject(TemplateRef);
}
