import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OverlayRefExtra } from '../../components/overlay/overlay-ref-extra';
import { LibraryModule } from '../../library/library.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-settings-quick-access',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    RouterLink,
  ],
  templateUrl: './settings-quick-access.component.html',
  host: {
    style: 'grid-column: 1 / span 2'
  }
})
export class SettingsQuickAccessComponent {
  private overlayRef = inject(OverlayRefExtra);

  onClick() {
    this.overlayRef.close();
  }

}
