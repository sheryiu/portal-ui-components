import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ButtonModule, PuiOverlayRef } from 'portal-ui-ng/base';
import { BreadcrumbsComponent, TooltipDirective } from 'portal-ui-ng/components';
import { LayoutService } from '../layout/layout.service';
import { ACTION_DRAWER_LAYOUT_DATA_PROVIDER } from './action-drawer-layout';

@Component({
  selector: 'pui-action-drawer-layout',
  imports: [
    BreadcrumbsComponent,
    NgComponentOutlet,
    NgTemplateOutlet,
    ButtonModule,
    TooltipDirective,
  ],
  providers: [
    LayoutService,
  ],
  templateUrl: './action-drawer-layout.component.html',
  styles: ``,
  host: {
    class: 'pui-action-drawer-layout',
  }
})
export class ActionDrawerLayoutComponent {
  private overlayRef = inject(PuiOverlayRef)
  private dataProvider = inject(ACTION_DRAWER_LAYOUT_DATA_PROVIDER)
  protected layoutService = inject(LayoutService, { self: true });
  configuration = this.dataProvider?.configuration;

  protected heading = computed(() => this.dataProvider.heading());
  protected contentInputs = computed(() => this.dataProvider.contentInputs?.() ?? {});
  protected controls = this.layoutService.controls;
  protected mostEmphasizedControlId = this.layoutService.mostEmphasizedControlId;

  constructor() {
    this.dataProvider.onActionDrawerInit?.(this.overlayRef)
  }
}
