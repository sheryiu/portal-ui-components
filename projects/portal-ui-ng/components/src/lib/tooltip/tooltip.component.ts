import { NgComponentOutlet } from '@angular/common';
import { Component, Injector, Type, inject } from '@angular/core';
import { OVERLAY_DATA } from 'portal-ui-ng/base';

export type TooltipData = {
  message: string | null | undefined;
  component: Type<unknown> | null;
}

@Component({
  selector: 'pui-tooltip',
  templateUrl: './tooltip.component.html',
  host: {
    class: 'pui-tooltip',
  },
  imports: [
    NgComponentOutlet
  ]
})
export class TooltipComponent {
  data = inject(OVERLAY_DATA) as TooltipData;
  injector = inject(Injector);
}
