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
