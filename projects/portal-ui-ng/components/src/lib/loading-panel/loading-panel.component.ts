import { animate, animation, style } from '@angular/animations';
import { Component, DestroyRef, effect, inject, input, numberAttribute, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timer } from 'rxjs';

@Component({
  selector: 'pui-loading-panel',
  imports: [],
  templateUrl: './loading-panel.component.html',
  styles: ``
})
export class LoadingPanelComponent {
  private destroyRef = inject(DestroyRef)
  protected isStuck = signal(false)

  /**
   * in milliseconds
   */
  stuckTimer = input(5000, { transform: numberAttribute })

  constructor() {
    effect(() => {
      this.isStuck.set(false)
      timer(this.stuckTimer()).pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe(() => {
        this.isStuck.set(true)
      })
    })
  }
}

export const LOADING_PANEL_LEAVING = animation([
  style({ opacity: 1, transform: 'translateY(0)', position: 'absolute', width: '100%' }),
  animate('250ms ease-in-out', style({ transform: 'translateY(1rem)', opacity: 0 })),
])
export const LOADING_PANEL_ENTERING = animation([
  style({ opacity: 0, transform: 'translateY(1rem)', position: 'absolute', width: '100%' }),
  animate('250ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1 })),
])