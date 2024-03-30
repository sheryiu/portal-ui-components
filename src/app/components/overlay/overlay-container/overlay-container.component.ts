import { AnimationEvent, animate, style, transition, trigger } from '@angular/animations';
import { Component, Injector, TemplateRef, inject } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { OVERLAY_CONTENT, OVERLAY_DATA } from '../overlay';
import { OverlayRefExtra } from '../overlay-ref-extra';

@Component({
  selector: 'app-overlay-container',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './overlay-container.component.html',
  host: {
    class: 'core-overlay-container',
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

  overlayRefExtra = inject(OverlayRefExtra);
  showing = false;

  constructor() {
    this.overlayRefExtra.afterOpened$.subscribe(() => this.showing = true);
    this.overlayRefExtra._close$.subscribe(() => this.showing = false);
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === null) return;
    this.overlayRefExtra.afterClosed$.next();
    this.overlayRefExtra.dispose();
  }
}
