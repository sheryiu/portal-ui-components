import { Injectable, inject, signal } from '@angular/core';
import { liveQuery } from 'dexie';
import { nanoid } from 'nanoid';
import { from, throwError } from 'rxjs';
import { TodoDatabaseService } from './todo-database.service';

export type CreateTodo = {
  title: string;
  label: string | null;
}
export type UpdateTodo = {
  title?: string;
  label?: string | null;
  remindOn?: Date | null;
}
export type CreateTodoItem = {
  description: string;
}
export type UpdateTodoItem = {
  description?: string;
  isCompleted?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private database = inject(TodoDatabaseService);

  mainFilter = signal<'incomplete' | 'all'>('incomplete')

  list = (filter: 'incomplete' | 'all') => from(liveQuery(() => {
    if (this.database.isServer) return [];
    return this.database.todos
      .orderBy('title')
      .filter(todo => filter === 'all' ? true : (todo.items.length == 0 || todo.items.some(i => i.isCompleted == false)))
      .toArray();
  }));

  one = (id: string) => from(liveQuery(() => {
    if (this.database.isServer) return undefined;
    return this.database.todos.get(id);
  }))

  create(args: { input: CreateTodo }) {
    if (!args.input.title) return throwError(() => new Error('Name is required'));
    return from(this.database.todos.add({
      ...args.input,
      id: nanoid(),
      items: [],
      remindOn: null,
    }))
  }

  update(id: string, args: { input: UpdateTodo }) {
    return from(this.database.todos.update(id, {
      ...(typeof args.input.title === 'undefined' ? {} : { title: args.input.title }),
      ...(typeof args.input.label === 'undefined' ? {} : { label: args.input.label }),
      ...(typeof args.input.remindOn === 'undefined' ? {} : { remindOn: args.input.remindOn }),
    }))
  }

  addItem(id: string, args: { input: CreateTodoItem }) {
    return from(this.database.todos.where('id').equals(id).modify((todo) => {
      todo.items.push({
        id: nanoid(),
        description: args.input.description,
        isCompleted: false,
      })
    }))
  }

  updateItem(id: string, itemId: string, args: { input: UpdateTodoItem }) {
    return from(this.database.todos.where('id').equals(id).modify((todo) => {
      todo.items = todo.items.map(i => {
        if (i.id === itemId) {
          return {
            ...i,
            ...(typeof args.input.description === 'undefined' ? {} : { description: args.input.description }),
            ...(typeof args.input.isCompleted === 'undefined' ? {} : { isCompleted: args.input.isCompleted }),
          }
        } else {
          return i;
        }
      })
    }))
  }

  remove(id: string) {
    return from(this.database.todos.delete(id));
  }
}
