import { Component, inject } from '@angular/core';
import { BreadcrumbsComponent, ButtonModule, LayeredContainerComponent, ModalDialogService, SidebarModule } from 'portal-ui-ng';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'demo-demo-dialog',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
    ButtonModule,
  ],
  templateUrl: './demo-dialog.component.html',
  styles: ``
})
export class DemoDialogComponent {
  private dialogService = inject(ModalDialogService);

  open() {
    this.dialogService.open({
      title: 'Dialog Title',
      icon: 'gpp_maybe',
      details: 'Veniam officia sint adipisicing magna eiusmod veniam commodo labore est ex exercitation.',
      actions: [
        {
          label: 'Cancel',
        },
        {
          label: 'OK',
          disabled: true,
        }
      ]
    })
  }
}
