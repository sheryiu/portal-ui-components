import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, input, output } from '@angular/core';
import { EffectFn } from '@ngneat/effects-ng';
import { tap, throttleTime } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import { UpdateTodoItem } from '../../core/todo.service';
import { TodoItem } from '../../core/todo.types';

@Component({
  selector: 'demo-item',
  standalone: true,
  imports: [
    SharedModule,
    TextFieldModule,
  ],
  templateUrl: './item.component.html',
  styles: ``
})
export class ItemComponent extends EffectFn {
  item = input.required<TodoItem>();

  updateItem = output<UpdateTodoItem>();

  toggleCheckbox() {
    this.updateItem.emit({ isCompleted: !this.item().isCompleted });
  }

  onKeydown = this.createEffectFn<KeyboardEvent>(args$ => args$.pipe(
    throttleTime(200, undefined, { leading: false, trailing: true }),
    tap((event) => {
      this.updateItem.emit({ description: (event.target as HTMLInputElement).value });
    }),
  ));
}
