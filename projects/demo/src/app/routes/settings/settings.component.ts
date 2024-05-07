import { Component } from '@angular/core';
import { LayeredContainerComponent, SidebarModule, TabBarModule } from 'phead';
import { SharedModule } from '../../shared/shared.module';
import { SettingsDatabaseComponent } from './settings-database/settings-database.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    SharedModule,
    SettingsDatabaseComponent,
    LayeredContainerComponent,
    SidebarModule,
    TabBarModule,
  ],
  templateUrl: './settings.component.html',
  styles: ``
})
export class SettingsComponent {

}
