import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../components/services/theme.service';
import { SharedModule } from '../../../shared/shared.module';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    SharedModule,
    ThemeToggleComponent,
  ],
  templateUrl: './user-dialog.component.html',
  styles: ``
})
export class UserDialogComponent {
  private themeService = inject(ThemeService);

}
