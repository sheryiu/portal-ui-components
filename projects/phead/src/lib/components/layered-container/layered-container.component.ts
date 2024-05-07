import { animate, group, query, sequence, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { getLayeredContainerData } from './layered-container';

@Component({
  selector: 'phead-layered-container',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './layered-container.component.html',
  animations: [
    trigger('bgAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('125ms 50ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('200ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
    trigger('routeAnimation', [
      transition('* => *', [
        group([
          animate('100ms', style({ opacity: 1 })),
          query(':enter', [
            style({
              position: 'absolute',
              display: 'block',
              height: '100%',
              opacity: 0,
              translate: '2rem 0',
            }),
            animate('125ms 50ms ease-out', style({ opacity: 1, translate: '0 0' })),
          ], { optional: true, }),
          query(':leave', [
            style({
              position: 'absolute',
              display: 'block',
              height: '100%',
              opacity: 1,
              translate: '0 0',
              scale: 1,
            }),
            sequence([
              animate('50ms ease-out', style({ scale: 0.98 })),
              animate('150ms ease-in', style({ opacity: 0, translate: '2rem 0' })),
            ])
          ], { optional: true, }),
        ])
      ])
    ])
  ]
})
export class LayeredContainerComponent {
  private contexts = inject(ChildrenOutletContexts);

  getRouteAnimationData() {
    return getLayeredContainerData(this.contexts.getContext('primary')?.route?.snapshot?.data)?.animation;
  }

  getRouteDisplayType(): 'half' | 'full' | undefined {
    return getLayeredContainerData(this.contexts.getContext('primary')?.route?.snapshot?.data)?.displayType;
  }

}
