import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { QuickAccessComponentDirective } from '../quick-access-component.directive';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  imports: [
    SharedModule,
    QuickAccessComponentDirective,
  ],
  templateUrl: './language-toggle.component.html',
  styles: ``
})
export class LanguageToggleComponent {

}
