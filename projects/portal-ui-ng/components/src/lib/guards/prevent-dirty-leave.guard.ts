import { inject, isSignal, Signal } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { ModalDialogService } from '../modal-dialog';

export const preventDirtyLeave: CanDeactivateFn<unknown> = (component: unknown, currentRoute) => {
  if (!component) return true;
  if (typeof component == 'object' && 'isDirty' in component && isSignal(component['isDirty'])) {
    const dialog = inject(ModalDialogService)
    if (!!component.isDirty()) {
      return new Observable(subscriber => {
        const ref = dialog.open({
          title: 'You have unsaved changes',
          details: 'Your changes will be lost if you leave.',
          actions: [
            {
              label: 'Cancel',
              color: 'primary',
              onClick: () => {
                subscriber.next(false)
                subscriber.complete();
                ref.close();
              }
            },
            {
              label: 'Leave',
              color: 'red',
              onClick: () => {
                subscriber.next(true)
                subscriber.complete();
                ref.close();
              }
            },
          ]
        }, {
          closeOnBackdropClick: false,
          disposeOnNavigation: true,
        })
        return () => {
          ref.close()
        }
      })
    }
    return true;
  }
  return true;
}

export interface PreventDirtyLeaveComponent {
  isDirty: Signal<boolean>;
}