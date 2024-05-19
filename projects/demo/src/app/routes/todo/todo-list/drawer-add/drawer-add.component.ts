import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { AccordionModule, FieldModule, ModalDialogService, SidebarModule } from 'phead';
import { EMPTY, catchError, exhaustMap, finalize, tap } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import { CreateTodo, TodoService } from '../../core/todo.service';

@Component({
  selector: 'demo-drawer-add',
  standalone: true,
  imports: [
    SharedModule,
    SidebarModule,
    AccordionModule,
    FieldModule,
  ],
  templateUrl: './drawer-add.component.html',
  styles: ``
})
export class DrawerAddComponent extends EffectFn {
  private service = inject(TodoService);
  private dialog = inject(ModalDialogService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  formControl = inject(FormBuilder).nonNullable.control<CreateTodo>({
    title: '',
    label: null,
  })

  onSubmit = this.createEffectFn<void>(args$ => args$.pipe(
    tap(() => this.formControl.disable()),
    exhaustMap(() => this.service.create({ input: this.formControl.getRawValue() }).pipe(
      catchError((err: Error) => {
        this.dialog.open({
          title: 'Error',
          icon: 'error',
          details: err.message,
          dialogClass: 'error-dialog',
        })
        return EMPTY;
      }),
      finalize(() => this.formControl.enable()),
      tap(id => this.router.navigate([id], { relativeTo: this.route })),
      tap(() => this.formControl.reset()),
    )),
  ))
}
