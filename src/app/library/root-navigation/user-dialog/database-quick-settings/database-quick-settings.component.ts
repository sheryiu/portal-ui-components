import { isPlatformServer } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import Dexie from 'dexie';
import { Observable, from, map, startWith, switchMap } from 'rxjs';
import { OverlayService } from '../../../../components/overlay/overlay.service';
import { DatabaseService } from '../../../../data/database.service';
import { ArmorSetCreateComponent } from '../../../../routes/monster-hunter/armor-set/armor-set-create/armor-set-create.component';
import { SharedModule } from '../../../../shared/shared.module';
import { SettingsDialogComponent } from '../../../settings-dialog/settings-dialog.component';
import { SettingsDialogService } from '../../../settings-dialog/settings-dialog.service';

@Component({
  selector: 'app-database-quick-settings',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './database-quick-settings.component.html',
  styles: ``,
  host: {
    class: 'col-span-2'
  }
})
export class DatabaseQuickSettingsComponent {
  private service = inject(DatabaseService);
  private settingsDialog = inject(SettingsDialogService);

  bytesUsed$ = this.service.bytesUsed$;

  openSettings() {
    this.settingsDialog.openSettings();
  }
}
