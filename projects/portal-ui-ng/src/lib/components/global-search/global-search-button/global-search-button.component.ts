import { Component, inject } from '@angular/core';
import { HoverableDirective } from '../../../base';
import { GlobalSearchService } from '../global-search.service';

@Component({
  selector: 'pui-global-search-button',
  standalone: true,
  imports: [
    // HotkeysShortcutPipe,
    HoverableDirective,
  ],
  templateUrl: './global-search-button.component.html',
  styles: ``
})
export class GlobalSearchButtonComponent {
  private service = inject(GlobalSearchService);

  onClick() {
    this.service.openOverlay();
  }
}
