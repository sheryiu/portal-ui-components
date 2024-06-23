import { Component, inject } from '@angular/core';
import { HoverableDirective, PuiOverlayService, QuickAccessService } from 'portal-ui-ng';

@Component({
  selector: 'demo-user',
  standalone: true,
  imports: [HoverableDirective,],
  templateUrl: './user.component.html',
  styles: ``
})
export class UserComponent {
  private overlay = inject(PuiOverlayService);
  private quickAccessService = inject(QuickAccessService);

  onUserClick(event: MouseEvent) {
    this.quickAccessService.toggle(
      // this.overlay.position().global().left((event.currentTarget as Element).getBoundingClientRect().right + 'px'),
      this.overlay.position().flexibleConnectedTo(event.currentTarget as Element)
        .withPositions([
          { originX: 'end', overlayX: 'end', originY: 'bottom', overlayY: 'top' },
          // { originX: 'end', overlayX: 'end', originY: 'bottom', overlayY: 'bottom' },
        ]),
      event.currentTarget as Element
    )
  }
}
