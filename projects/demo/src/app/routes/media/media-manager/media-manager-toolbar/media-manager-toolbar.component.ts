import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'portal-ui-ng/base';
import { TabBarModule, TooltipDirective } from 'portal-ui-ng/components';
import { Media } from '../../../../data/media.types';

@Component({
  selector: 'demo-media-manager-toolbar',
  imports: [TabBarModule, TooltipDirective, ButtonModule, RouterLink, NgClass],
  templateUrl: './media-manager-toolbar.component.html',
  styles: `
  :host ::ng-deep pui-tab-bar .pui-tab-bar-tabs {
    @apply pui-card--subtle;
  }
  `
})
export class MediaManagerToolbarComponent {
  parentFolders = input.required<(Media | null)[]>()
  navigateWithRouter = input.required<boolean>()
  viewMode = input.required<'grid' | 'list'>()
  navigateTo = output<Media | null>()
  viewModeChange = output<'grid' | 'list'>()
}
