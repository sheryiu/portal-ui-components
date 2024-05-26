import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EffectFn } from '@ngneat/effects-ng';
import { AccordionModule, FieldModule, ModalDialogService, SidebarModule } from 'portal-ui-ng';
import { EMPTY, catchError, exhaustMap } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import { TodoService } from '../../core/todo.service';
import { Todo } from '../../core/todo.types';

@Component({
  selector: 'demo-drawer-remind',
  standalone: true,
  imports: [
    SharedModule,
    SidebarModule,
    AccordionModule,
    FieldModule,
  ],
  templateUrl: './drawer-remind.component.html',
  styles: ``
})
export class DrawerRemindComponent extends EffectFn {
  private service = inject(TodoService);
  private dialog = inject(ModalDialogService);
  todo = input.required<Todo | undefined>();
  formControl = inject(FormBuilder).nonNullable.control<{ remindOn: Date | null }>({ remindOn: null });

  constructor() {
    super();
    effect(() => {
      if (this.todo()) {
        this.formControl.setValue({
          remindOn: this.todo()!.remindOn
        })
      }
    })
  }

  onSubmit = this.createEffectFn<void>(args$ => args$.pipe(
    exhaustMap(() => this.service.update(this.todo()?.id!, { input: this.formControl.getRawValue() }).pipe(
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
  ))

}
