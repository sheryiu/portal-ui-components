import { isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import Dexie from 'dexie';
import { Todo } from './todo.types';

@Injectable({
  providedIn: 'root'
})
export class TodoDatabaseService extends Dexie {
  todos!: Dexie.Table<Todo, string>;

  private platformId = inject(PLATFORM_ID);
  isServer = isPlatformServer(this.platformId);

  constructor() {
    super('todo-database');
    if (this.isServer) return;
    import("dexie-export-import")
    this.version(2).stores({
      todos: 'id, title, label',
    })
  }

  emptyDatabase() {
    return this.delete().then(() => {
      location.reload();
    });
  }
}
