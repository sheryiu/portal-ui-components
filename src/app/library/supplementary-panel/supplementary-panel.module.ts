import { NgModule } from '@angular/core';
import { SupplementaryPanelActionsDirective } from './supplementary-panel-actions.directive';
import { SupplementaryPanelComponent } from './supplementary-panel.component';

@NgModule({
  declarations: [],
  imports: [
    SupplementaryPanelComponent,
    SupplementaryPanelActionsDirective,
  ],
  exports: [
    SupplementaryPanelComponent,
    SupplementaryPanelActionsDirective,
  ]
})
export class SupplementaryPanelModule { }
