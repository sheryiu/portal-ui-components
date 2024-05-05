import { Component } from '@angular/core';
import { LibraryModule } from '../../library/library.module';
import { SharedModule } from '../../shared/shared.module';
import { SettingsDatabaseComponent } from './settings-database/settings-database.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    SettingsDatabaseComponent,
  ],
  templateUrl: './settings.component.html',
  styles: ``
})
export class SettingsComponent {

}
