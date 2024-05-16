import { NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { nanoid } from 'nanoid';
import { HoverableDirective, PheadOverlayService } from '../../base';
import { GlobalSearchModule } from '../global-search';
import { TooltipModule } from '../tooltip';
import { QuickAccessService } from './quick-access/quick-access.service';
import { ROOT_NAVIGATION_LOGO, ROOT_NAVIGATION_TABS } from './root-navigation';

@Component({
  selector: 'phead-root-navigation',
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
    class: 'phead-root-navigation'
  }
})
export class RootNavigationComponent {
  private overlay = inject(PheadOverlayService);
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
