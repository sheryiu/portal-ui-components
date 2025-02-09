import { CdkPortalOutlet, ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { AfterViewInit, Component, ComponentRef, Signal, Type, inject, isSignal, signal, viewChild } from '@angular/core';
import { ButtonModule, HoverableDirective, OVERLAY_DATA } from 'portal-ui-ng/base';

export type ModalDialogData<C = undefined> = {
  dialogClass?: string;
  icon?: string;
  iconComponent?: Type<unknown>;
  title: string;
  details?: string;
  detailsHtml?: string;
  detailsComponent?: Type<C>;
  actions?: {
    label: string | Signal<string>;
    disabled?: boolean | Signal<boolean>;
    color?:
      | 'primary'
      | 'accent'
      | 'gray'
      | 'grey'
      | 'red'
      | 'orange'
      | 'amber'
      | 'yellow'
      | 'lime'
      | 'green'
      | 'emerald'
      | 'teal'
      | 'cyan'
      | 'sky'
      | 'blue'
      | 'indigo'
      | 'violet'
      | 'purple'
      | 'fuchsia'
      | 'pink'
      | 'rose'
      | null
      | undefined;
    onClick?: (event: MouseEvent) => void;
  }[];
  onDetailsComponentAttached?: (componentRef: ComponentRef<C>) => void;
}

@Component({
  selector: 'pui-modal-dialog',
  imports: [
    NgClass,
    NgComponentOutlet,
    HoverableDirective,
    PortalModule,
    ButtonModule,
  ],
  templateUrl: './modal-dialog.component.html',
  styles: ``
})
export class ModalDialogComponent<C = undefined> implements AfterViewInit {
  data = inject(OVERLAY_DATA) as ModalDialogData<C>;
  detailsPortal = this.data.detailsComponent ? new ComponentPortal(this.data.detailsComponent) : null;
  private detailsOutlet: Signal<CdkPortalOutlet> = viewChild.required('portalOutlet');

  actions = (this.data.actions ?? []).map(action => ({
    label: isSignal(action.label) ? action.label : signal(action.label),
    disabled: isSignal(action.disabled) ? action.disabled : signal(action.disabled),
    color: action.color,
    onClick: action.onClick,
  }))

  ngAfterViewInit(): void {
    if (this.detailsOutlet && this.detailsPortal) {
      setTimeout(() => {
        const ref = this.detailsOutlet().attach(this.detailsPortal);
        this.data.onDetailsComponentAttached?.(ref);
      })
    }
  }

}
