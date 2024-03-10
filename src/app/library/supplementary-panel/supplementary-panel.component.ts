import { Component, ContentChild, Input } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SupplementaryPanelActionsDirective } from './supplementary-panel-actions.directive';

@Component({
  selector: 'core-supplementary-panel',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './supplementary-panel.component.html',
  host: {
    class: 'core-supplementary-panel @container/supplementary-panel'
  }
})
export class SupplementaryPanelComponent {
  @Input() createdAt?: Date | null | undefined;
  @Input() updatedAt?: Date | null | undefined;

  @ContentChild(SupplementaryPanelActionsDirective) actionsDirective?: SupplementaryPanelActionsDirective;

}
