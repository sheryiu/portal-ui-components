import { Routes } from '@angular/router';
import { breadcrumb, layeredContainer } from 'phead';
import { map, switchMap } from 'rxjs';
import { TodoService } from './core/todo.service';

export const TODO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./todo-list/todo-list.component').then(c => c.TodoListComponent),
    children: [
      {
        path: ':id',
        loadComponent: () => import('./todo-detail/todo-detail.component').then(c => c.TodoDetailComponent),
        data: {
          ...breadcrumb({
            deps: [TodoService] as const,
            titleFn: (route, service: TodoService) => route.params.pipe(
              map(params => params['id']),
              switchMap((id) => service.one(id)),
              map(todo => todo?.title ?? 'Not Found')
            ),
          }),
          ...layeredContainer('half')
        }
      }
    ]
  }
]