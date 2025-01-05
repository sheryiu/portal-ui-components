import { AnimationEvent, animate, style, transition, trigger } from '@angular/animations';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { Component, Injector, TemplateRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OVERLAY_CONFIG, OVERLAY_CONTENT, OVERLAY_DATA } from '../overlay';
import { PuiOverlayRef } from '../pui-overlay-ref';

@Component({
  selector: 'pui-overlay-container',
  standalone: true,
  imports: [NgComponentOutlet, NgTemplateOutlet],
  templateUrl: './overlay-container.component.html',
  host: {
    class: 'pui-overlay-container',
  },
  animations: [
    trigger('appear', [
      transition(':enter', [
        style({
          opacity: 0,
          scale: 0.95,
          translate: '0 -1rem',
        }),
        animate('75ms ease-out', style({
          opacity: 1,
          scale: 1,
          translate: '0 0',
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          scale: 1,
          translate: '0 0',
        }),
        animate('75ms ease-out', style({
          opacity: 0,
          scale: 0.95,
          translate: '0 -1rem',
        }))
      ]),
    ]),
    trigger('appearSlideInEnd', [
      transition(':enter', [
        style({
          opacity: 0,
          translate: '4rem 0',
        }),
        animate('125ms ease-in-out', style({
          opacity: 1,
          translate: '0 0',
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          translate: '0 0',
        }),
        animate('125ms ease-in-out', style({
          opacity: 0,
          translate: '4rem 0',
        }))
      ]),
    ]),
  ]
})
export class OverlayContainerComponent {
  private content = inject(OVERLAY_CONTENT);
  protected config = inject(OVERLAY_CONFIG);
  injector = inject(Injector);
  data = inject(OVERLAY_DATA);
  templateRef = this.content instanceof TemplateRef ? this.content : null;
  component = !(this.content instanceof TemplateRef) ? this.content : null;

  overlayRef = inject(PuiOverlayRef);
  showing = false;

  constructor() {
    this.overlayRef.afterOpened$.subscribe(() => this.showing = true);
    this.overlayRef._close$.subscribe(() => this.showing = false);
    if (this.config.animation === null) {
      this.overlayRef._close$.pipe(
        takeUntilDestroyed()
      ).subscribe(() => {
        this.overlayRef.afterClosed$.next();
        this.overlayRef.dispose();
      })
    }
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === null) return;
    this.overlayRef.afterClosed$.next();
    this.overlayRef.dispose();
  }
}
