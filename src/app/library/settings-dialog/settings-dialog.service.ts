import { Injectable, inject } from '@angular/core';
import { OverlayService } from '../../components/overlay/overlay.service';
import { SettingsDialogComponent } from './settings-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class SettingsDialogService {

  private overlay = inject(OverlayService);

  openSettings() {
    this.overlay.open(SettingsDialogComponent, {
      positionStrategy: this.overlay.position().global()
        .centerVertically()
        .centerHorizontally(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      hasBackdrop: true,
      closeOnBackdropClick: true,
    })
  }
}
