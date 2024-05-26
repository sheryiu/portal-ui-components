import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TimeDisplayComponent } from 'portal-ui-ng';
import { SharedModule } from '../../../../shared/shared.module';
import { Todo } from '../../core/todo.types';

@Component({
  selector: 'demo-todo-card',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    RouterLinkActive,
    TimeDisplayComponent,
  ],
  templateUrl: './todo-card.component.html',
  styles: ``
})
export class TodoCardComponent {
  todo = input.required<Todo>()
}
