import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HotkeysService } from '@ngneat/hotkeys';
import { HoverableDirective, PheadOverlayRef, PheadOverlayService } from '../../../base';
import { GlobalSearchComponent, GlobalSearchData } from '../global-search.component';

@Component({
  selector: 'phead-global-search-button',
  standalone: true,
  imports: [
    // HotkeysShortcutPipe,
    HoverableDirective,
  ],
  templateUrl: './global-search-button.component.html',
  styles: ``
})
export class GlobalSearchButtonComponent {
  @ViewChild('btn') private button!: ElementRef<HTMLElement>;
  private hotKeys = inject(HotkeysService, { optional: true });
  private overlay = inject(PheadOverlayService, { optional: true });
  private overlayRef?: PheadOverlayRef;

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      this.hotKeys?.addShortcut({ keys: 'control.k', preventDefault: true }).pipe(
        takeUntilDestroyed(),
      ).subscribe(() => this.onClick({
        currentTarget: this.button.nativeElement,
      }))
      if (this.overlay == null) {
        throw new Error('Global Search UI requires PheadOverlayService, please provide the overlay service in your application config')
      }
    }
  }

  onClick(event: { currentTarget: EventTarget | null }) {
    if (this.overlayRef || !this.overlay) return;
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    this.overlayRef = this.overlay.open<GlobalSearchComponent, GlobalSearchData>(
      GlobalSearchComponent,
      {
        positionStrategy: this.overlay.position().global()
          .top('0')
          .left('0'),
        scrollStrategy: this.overlay.scrollStrategies.block(),
        width: '100vw',
        height: '100vh',
        disposeOnNavigation: true,
        data: {
          originPosition: {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          },
        }
      }
    )
    this.overlayRef.afterClosed$.subscribe(() => {
      this.overlayRef = undefined;
    })
  }
}
