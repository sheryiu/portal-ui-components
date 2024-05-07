import { Component } from '@angular/core';
import { QuickAccessComponentDirective } from '../quick-access-component.directive';

@Component({
  selector: 'phead-language-toggle',
  standalone: true,
  imports: [
    QuickAccessComponentDirective,
  ],
  templateUrl: './language-toggle.component.html',
  styles: ``
})
export class LanguageToggleComponent {

}
