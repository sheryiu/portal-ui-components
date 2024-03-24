import { Component, inject } from '@angular/core';
import { OverlayRefExtra } from '../../components/overlay/overlay-ref-extra';
import { DatabaseService } from '../../data/database.service';
import { SharedModule } from '../../shared/shared.module';
import { LibraryModule } from '../library.module';

@Component({
  selector: 'core-settings-dialog',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
  ],
  templateUrl: './settings-dialog.component.html',
  styles: ``
})
export class SettingsDialogComponent {
  private overlayRef = inject(OverlayRefExtra);
  private service = inject(DatabaseService);

  bytesUsed$ = this.service.bytesUsed$;

  currentTab = 'database';

  onGotoTab(tab: string) {
    this.currentTab = tab;
  }
}
