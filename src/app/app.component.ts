import { Location, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibraryModule } from './library/library.module';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, LibraryModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'design-system-alpha';
  private location = inject(Location);

  constructor() {
    const history: Record<string, number> = {};
    this.location.onUrlChange((url, state) => {
      console.log(url, state)
      if (history[url] != null && (state as any)['navigationId'] != history[url]) {
        // this.location.replaceState(url, undefined, { navigationId: history[url] })
      } else {
        history[url] = (state as any)['navigationId'];
      }
    })
  }
}
