import { Component } from '@angular/core';
import { ButtonModule } from 'portal-ui-ng/base';
import { DividerComponent, LoadingPanelComponent } from "portal-ui-ng/components";

@Component({
  selector: 'demo-loading-panel-demo',
  imports: [LoadingPanelComponent, ButtonModule, DividerComponent],
  templateUrl: './loading-panel-demo.component.html',
})
export class LoadingPanelDemoComponent {

}
