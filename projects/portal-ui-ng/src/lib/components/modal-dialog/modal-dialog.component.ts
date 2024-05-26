import { CdkPortalOutlet, ComponentPortal, PortalModule } from '@angular/cdk/portal';
import { NgClass, NgComponentOutlet } from '@angular/common';
import { AfterViewInit, Component, ComponentRef, Type, ViewChild, inject } from '@angular/core';
import { ButtonModule, HoverableDirective, OVERLAY_DATA } from '../../base';

export type ModalDialogData<C = undefined> = {
  dialogClass?: string;
  icon?: string;
  iconComponent?: Type<unknown>;
  title: string;
  details?: string;
  detailsHtml?: string;
  detailsComponent?: Type<C>;
  actions?: {
    label: string;
    disabled?: boolean;
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
      | 'rose';
    onClick?: (event: MouseEvent) => void;
  }[];
  onDetailsComponentAttached?: (componentRef: ComponentRef<C>) => void;
}

@Component({
  selector: 'pui-modal-dialog',
  standalone: true,
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
  @ViewChild('portalOutlet') private detailsOutlet!: CdkPortalOutlet;

  ngAfterViewInit(): void {
    if (this.detailsOutlet && this.detailsPortal) {
      setTimeout(() => {
        const ref = this.detailsOutlet.attach(this.detailsPortal);
        this.data.onDetailsComponentAttached?.(ref);
      })
    }
  }

}
