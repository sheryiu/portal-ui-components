import { Component } from '@angular/core';
import { ButtonModule } from 'portal-ui-ng/base';
import { TooltipDirective } from 'portal-ui-ng/components';
import { TabBarModule } from "../../../../../../../portal-ui-ng/components/src/lib/tab-bar/tab-bar.module";

@Component({
  selector: 'demo-media-manager-toolbar',
  standalone: true,
  imports: [TabBarModule, TooltipDirective, ButtonModule],
  templateUrl: './media-manager-toolbar.component.html',
  styles: `
  :host ::ng-deep pui-tab-bar .pui-tab-bar-tabs {
    @apply pui-card--subtle;
  }
  `
})
export class MediaManagerToolbarComponent {

}
