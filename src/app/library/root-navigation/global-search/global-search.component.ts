import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HotkeysDirective, HotkeysService } from '@ngneat/hotkeys';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'core-global-search',
  standalone: true,
  imports: [
    HotkeysDirective,
    SharedModule,
  ],
  templateUrl: './global-search.component.html',
  styles: ``
})
export class GlobalSearchComponent {
  private hotKeys = inject(HotkeysService);

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      this.hotKeys.addShortcut({ keys: 'meta.k', preventDefault: true }).pipe(
        takeUntilDestroyed(),
      ).subscribe(() => this.onClick())
    }
  }

  onClick() {
    console.log('open')
  }
}
