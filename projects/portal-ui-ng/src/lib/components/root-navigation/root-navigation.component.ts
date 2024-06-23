import { NgComponentOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { nanoid } from 'nanoid';
import { HoverableDirective } from '../../base';
import { ROOT_NAVIGATION_LOGO, ROOT_NAVIGATION_TABS, ROOT_NAVIGATION_USER } from './root-navigation';

@Component({
  selector: 'pui-root-navigation',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    HoverableDirective,
    NgComponentOutlet,
  ],
  templateUrl: './root-navigation.component.html',
})
export class RootNavigationComponent {

  logo = inject(ROOT_NAVIGATION_LOGO, { optional: true });
  tabs = inject(ROOT_NAVIGATION_TABS, { optional: true })?.map(t => ({
    id: nanoid(),
    ...t,
  }));
  user = inject(ROOT_NAVIGATION_USER, { optional: true });
}
