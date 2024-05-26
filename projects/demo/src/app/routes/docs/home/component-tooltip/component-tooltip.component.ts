import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TooltipDirective } from 'portal-ui-ng';
import { timer } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-component-tooltip',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './component-tooltip.component.html',
  styles: ``
})
export class ComponentTooltipComponent {
  position = signal<ReturnType<TooltipDirective['position']>>('bottom')

  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      timer(5000, 5000).pipe(
        takeUntilDestroyed(this.destroyRef),
      ).subscribe(() => {
        this.position.set((['start', 'end', 'top', 'bottom'] as const).at(Math.floor(Math.random() * 4))!)
      })
    })
  }
}
