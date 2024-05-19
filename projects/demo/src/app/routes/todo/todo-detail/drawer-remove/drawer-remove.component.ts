import { Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { AccordionModule, ModalDialogData, ModalDialogService, RemoveConfirmComponent, SidebarModule } from 'phead';
import { EMPTY, Observable, catchError, exhaustMap, tap } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import { TodoService } from '../../core/todo.service';
import { Todo } from '../../core/todo.types';

@Component({
  selector: 'demo-drawer-remove',
  standalone: true,
  imports: [
    SharedModule,
    SidebarModule,
    AccordionModule,
  ],
  templateUrl: './drawer-remove.component.html',
  styles: ``
})
export class DrawerRemoveComponent extends EffectFn {
  private service = inject(TodoService);
  private dialog = inject(ModalDialogService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  todo = input.required<Todo | undefined>();

  onRemoveClick = this.createEffectFn<void>(args$ => args$.pipe(
    exhaustMap(() => {
      return new Observable(subscriber => {
        const options: ModalDialogData<RemoveConfirmComponent> = {
          title: 'Are you sure to remove?',
          icon: 'delete_forever',
          actions: [
            {
              label: 'Cancel',
              onClick: () => {
                subscriber.complete();
                dialogRef.close();
              }
            },
            {
              label: 'Confirm',
              disabled: true,
              color: 'red',
              onClick: () => {
                subscriber.next();
                subscriber.complete();
                dialogRef.close();
              }
            },
          ],
          detailsComponent: RemoveConfirmComponent,
          onDetailsComponentAttached: (ref) => {
            ref.setInput('stringToCheck', this.todo()?.title ?? 'delete');
            ref.instance.matches$.subscribe(matches => {
              options.actions!.at(1)!.disabled = !matches
            })
          }
        }
        const dialogRef = this.dialog.open(options)
        dialogRef.afterClosed$.subscribe({
          next: () => subscriber.complete(),
          complete: () => subscriber.complete(),
        })
      })
    }),
    exhaustMap(() => this.service.remove(this.todo()?.id!).pipe(
      catchError((e: Error) => {
        this.dialog.open({
          title: 'Error',
          icon: 'error',
          details: e.message,
          dialogClass: 'error-dialog',
        });
        return EMPTY;
      }),
    )),
    tap(() => this.router.navigate(['../'], { relativeTo: this.route, replaceUrl: true }))
  ))
}
