import { Component, inject } from '@angular/core';
import { DatabaseService } from '../../../../data/database.service';
import { SharedModule } from '../../../../shared/shared.module';
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
