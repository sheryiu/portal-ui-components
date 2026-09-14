import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import {
  AnimationCallbackEvent,
  Component,
  Injector,
  TemplateRef,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OVERLAY_CONFIG, OVERLAY_CONTENT, OVERLAY_DATA } from '../overlay';
import { PuiOverlayRef } from '../pui-overlay-ref';

@Component({
  selector: 'pui-overlay-container',
  imports: [NgComponentOutlet, NgTemplateOutlet],
  templateUrl: './overlay-container.component.html',
  host: {
    class: 'pui-overlay-container',
  },
})
export class OverlayContainerComponent {
  private content = inject(OVERLAY_CONTENT);
  protected config = inject(OVERLAY_CONFIG);
  injector = inject(Injector);
  data = inject(OVERLAY_DATA);
  templateRef = this.content instanceof TemplateRef ? this.content : null;
  component = !(this.content instanceof TemplateRef) ? this.content : null;

  overlayRef = inject(PuiOverlayRef);
  showing = signal(false);

  constructor() {
    this.overlayRef.afterOpened$.subscribe(() => this.showing.set(true));
    this.overlayRef._close$.subscribe(() => this.showing.set(false));
    if (this.config.animateLeave == null) {
      this.overlayRef._close$.pipe(takeUntilDestroyed()).subscribe(() => {
        this.overlayRef.afterClosed$.next();
        this.overlayRef.dispose();
      });
    }
  }

  animationEnded(event: AnimationCallbackEvent) {
    const duration = event.target
      .computedStyleMap()
      .get('transition-duration') as
      | { value: number; unit: string }
      | undefined;
    let durationMs =
      duration?.unit == 's' ? duration.value * 1000 : duration?.value;
    if (durationMs == null || durationMs <= 0) durationMs = 100;
    setTimeout(() => {
      this.overlayRef.afterClosed$.next();
      this.overlayRef.dispose();
      event.animationComplete();
    }, durationMs);
  }
}
