import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PheadOverlayRef, QuickAccessComponentDirective } from 'phead';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-settings-quick-access',
  standalone: true,
  imports: [
    SharedModule,
    QuickAccessComponentDirective,
    RouterLink,
  ],
  templateUrl: './settings-quick-access.component.html',
  host: {
    style: 'grid-column: 1 / span 2'
  }
})
export class SettingsQuickAccessComponent {
  private overlayRef = inject(PheadOverlayRef);

  onClick() {
    this.overlayRef.close();
  }

}
