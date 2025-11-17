import { Component, inject, signal } from '@angular/core';
import { ButtonModule } from 'portal-ui-ng/base';
import { DividerComponent, ModalDialogService, RemoveConfirmComponent } from 'portal-ui-ng/components';
import { CustomContentComponent } from './custom-content/custom-content.component';

@Component({
  selector: 'demo-modal-dialog-demo',
  imports: [
    ButtonModule,
    DividerComponent
  ],
  templateUrl: './modal-dialog-demo.component.html',
})
export class ModalDialogDemoComponent {
  private modalDialog = inject(ModalDialogService)

  openTitleText(isDialog = false) {
    const ref = this.modalDialog.open({
      title: isDialog ? 'Dialog Title' : 'Modal Title',
      details: 'Ad dolore laboris minim quis aliqua. Aliqua ex quis dolore ut et et sint sunt consectetur. Nisi pariatur sit ullamco proident amet Lorem. Aliqua duis elit occaecat et laboris magna sint velit deserunt ad sunt id.',
      actions: isDialog ? [
        {
          label: 'Confirm',
          color: 'primary',
          onClick: () => {
            ref.close()
          }
        }
      ] : []
    })
  }

  openTitleIconText(isDialog = false) {
    const ref = this.modalDialog.open({
      title: isDialog ? 'Dialog Title' : 'Modal Title',
      icon: 'block',
      details: 'Ut exercitation consequat nisi ipsum cillum ad anim esse sint non excepteur consectetur sint. Enim ea veniam reprehenderit dolore eu quis sunt cupidatat proident qui culpa ipsum aliqua eiusmod. Est anim cupidatat proident fugiat deserunt pariatur.',
      actions: isDialog ? [
        {
          label: 'Cancel',
          onClick: () => {
            ref.close()
          }
        },
        {
          label: 'Confirm',
          color: 'primary',
          onClick: () => {
            ref.close()
          }
        }
      ] : []
    })
  }

  openTitleIconCustomContent(isDialog = false) {
    const ref = this.modalDialog.open({
      title: isDialog ? 'Dialog Title' : 'Modal Title',
      icon: 'travel_explore',
      detailsComponent: CustomContentComponent,
      actions: isDialog ? [
        {
          label: 'Open Link',
          color: 'sky',
          onClick: () => {
            ref.close()
          }
        },
        {
          label: 'Download',
          color: 'lime',
          onClick: () => {
            ref.close()
          }
        }
      ] : []
    })
  }

  openRemovalConfirmation() {
    const isDisabled = signal(true)
    const ref = this.modalDialog.open({
      title: 'Confirm Delete?',
      detailsComponent: RemoveConfirmComponent,
      onDetailsComponentAttached(componentRef) {
        componentRef.setInput('stringToCheck', 'Lorem Ipsum')
        componentRef.instance.matchChanged.subscribe(matches => {
          isDisabled.set(!matches)
        })
      },
      actions: [
        {
          label: 'Delete',
          color: 'red',
          disabled: isDisabled,
          onClick: () => {
            ref.close();
          }
        }
      ]
    })
  }

}
