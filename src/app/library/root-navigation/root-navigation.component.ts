import { Component, DestroyRef, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { nanoid } from 'nanoid';
import { OverlayRefExtra } from '../../components/overlay/overlay-ref-extra';
import { OverlayService } from '../../components/overlay/overlay.service';
import { SharedModule } from '../../shared/shared.module';
import { GlobalSearchModule } from '../global-search/global-search.module';
import { QuickAccessComponent } from './quick-access/quick-access.component';
import { ROOT_NAVIGATION_TABS } from './root-navigation';

@Component({
  selector: 'core-root-navigation',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
    GlobalSearchModule,
  ],
  templateUrl: './root-navigation.component.html',
  host: {
    class: 'core-root-navigation'
  }
})
export class RootNavigationComponent {
  private elementRef = inject(ElementRef) as ElementRef<Element>;
  private overlay = inject(OverlayService);
  private quickAccessOverlayRef?: OverlayRefExtra;
  private destroyRef = inject(DestroyRef);

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
        backdropClass: 'core-quick-access-backdrop',
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
