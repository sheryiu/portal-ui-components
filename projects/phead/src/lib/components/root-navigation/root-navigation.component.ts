import { NgComponentOutlet } from '@angular/common';
import { Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { nanoid } from 'nanoid';
import { HoverableDirective, PheadOverlayRef, PheadOverlayService } from '../../base';
import { GlobalSearchModule } from '../global-search';
import { TooltipModule } from '../tooltip';
import { QuickAccessComponent } from './quick-access/quick-access.component';
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
  private elementRef = inject(ElementRef) as ElementRef<Element>;
  private overlay = inject(PheadOverlayService);
  private quickAccessOverlayRef?: PheadOverlayRef;
  private destroyRef = inject(DestroyRef);

  logo = inject(ROOT_NAVIGATION_LOGO, { optional: true });
  tabs = inject(ROOT_NAVIGATION_TABS, { optional: true })?.map(t => ({
    id: nanoid(),
    ...t,
  }));

  onUserClick(event: MouseEvent) {
    if (this.quickAccessOverlayRef) {
      this.quickAccessOverlayRef.close();
      return
    }
    this.quickAccessOverlayRef = this.overlay.open(
      QuickAccessComponent,
      {
        positionStrategy: this.overlay.position().global()
          .left(this.elementRef.nativeElement.getBoundingClientRect().right + 'px'),
        hasBackdrop: true,
        backdropClass: 'phead-quick-access-backdrop',
        ignorePointerEventsFrom: [event.currentTarget as Element],
        height: '100vh',
      }
    )
    this.quickAccessOverlayRef.afterClosed$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(() => {
      this.quickAccessOverlayRef = undefined;
    })
  }
}
