import { NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { nanoid } from 'nanoid';
import { HoverableDirective, PuiOverlayService } from '../../base';
import { GlobalSearchModule } from '../global-search';
import { TooltipModule } from '../tooltip';
import { QuickAccessService } from './quick-access/quick-access.service';
import { ROOT_NAVIGATION_LOGO, ROOT_NAVIGATION_TABS } from './root-navigation';

@Component({
  selector: 'pui-root-navigation',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    GlobalSearchModule,
    HoverableDirective,
    NgComponentOutlet,
    TooltipModule,
  ],
  templateUrl: './root-navigation.component.html',
  host: {
    class: 'pui-root-navigation'
  }
})
export class RootNavigationComponent {
  private overlay = inject(PuiOverlayService);
  private quickAccessService = inject(QuickAccessService);

  logo = inject(ROOT_NAVIGATION_LOGO, { optional: true });
  tabs = inject(ROOT_NAVIGATION_TABS, { optional: true })?.map(t => ({
    id: nanoid(),
    ...t,
  }));

  // TODO split user button away
  onUserClick(event: MouseEvent) {
    this.quickAccessService.toggle(
      this.overlay.position().global().left((event.currentTarget as Element).getBoundingClientRect().right + 'px'),
      event.currentTarget as Element
    )
  }
}
