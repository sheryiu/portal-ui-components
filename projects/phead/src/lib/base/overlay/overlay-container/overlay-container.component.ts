import { AnimationEvent, animate, style, transition, trigger } from '@angular/animations';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { Component, TemplateRef, inject } from '@angular/core';
import { OVERLAY_CONTENT, OVERLAY_DATA } from '../overlay';
import { PheadOverlayRef } from '../phead-overlay-ref';

@Component({
  selector: 'phead-overlay-container',
  standalone: true,
  imports: [NgComponentOutlet, NgTemplateOutlet],
  templateUrl: './overlay-container.component.html',
  host: {
    class: 'phead-overlay-container',
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
    ])
  ]
})
export class OverlayContainerComponent {
  private content = inject(OVERLAY_CONTENT);
  data = inject(OVERLAY_DATA);
  templateRef = this.content instanceof TemplateRef ? this.content : null;
  component = !(this.content instanceof TemplateRef) ? this.content : null;

  overlayRef = inject(PheadOverlayRef);
  showing = false;

  constructor() {
    this.overlayRef.afterOpened$.subscribe(() => this.showing = true);
    this.overlayRef._close$.subscribe(() => this.showing = false);
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === null) return;
    this.overlayRef.afterClosed$.next();
    this.overlayRef.dispose();
  }
}
