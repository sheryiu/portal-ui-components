import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HotkeysService } from '@ngneat/hotkeys';
import { OverlayRefExtra } from '../../../components/overlay/overlay-ref-extra';
import { OverlayService } from '../../../components/overlay/overlay.service';
import { SharedModule } from '../../../shared/shared.module';
import { GlobalSearchComponent, GlobalSearchData } from '../global-search.component';

@Component({
  selector: 'core-global-search-button',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './global-search-button.component.html',
  styles: ``
})
export class GlobalSearchButtonComponent {
  @ViewChild('btn') private button!: ElementRef<HTMLElement>;
  private hotKeys = inject(HotkeysService);
  private overlay = inject(OverlayService);
  private overlayRef?: OverlayRefExtra;

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      this.hotKeys.addShortcut({ keys: 'meta.k', preventDefault: true }).pipe(
        takeUntilDestroyed(),
      ).subscribe(() => this.onClick({
        currentTarget: this.button.nativeElement,
      }))
    }
  }

  onClick(event: { currentTarget: EventTarget | null }) {
    if (this.overlayRef) return;
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
