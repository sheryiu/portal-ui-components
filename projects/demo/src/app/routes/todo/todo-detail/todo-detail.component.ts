import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { AccordionComponent, BreadcrumbsComponent, DividerComponent, LayeredContainerComponent, SidebarModule, TimeDisplayComponent } from 'phead';
import { map, switchMap } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { TodoService, UpdateTodoItem } from '../core/todo.service';
import { DrawerRemindComponent } from './drawer-remind/drawer-remind.component';
import { DrawerRemoveComponent } from './drawer-remove/drawer-remove.component';
import { ItemAddComponent } from './item-add/item-add.component';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'demo-todo-detail',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
    DividerComponent,
    AccordionComponent,
    DrawerRemoveComponent,
    ItemComponent,
    ItemAddComponent,
    DrawerRemindComponent,
    TimeDisplayComponent,
  ],
  templateUrl: './todo-detail.component.html',
  styles: ``
})
export class TodoDetailComponent {
  private route = inject(ActivatedRoute);
  private service = inject(TodoService);

  private todo = this.route.params.pipe(
    map(params => params['id']),
    switchMap(id => this.service.one(id)),
  )

  data = toSignal(this.todo);

  addItem(value: { description: string }) {
    this.service.addItem(this.data()?.id!, {
      input: value,
    })
  }

  updateItem(itemId: string, value: UpdateTodoItem) {
    this.service.updateItem(this.data()?.id!, itemId, {
      input: value,
    })
  }

  updateTitle(event: Event) {
    this.service.update(this.data()?.id!, {
      input: {
        title: (event.currentTarget as HTMLInputElement).value,
      }
    })
  }

  updateLabel(event: Event) {
    this.service.update(this.data()?.id!, {
      input: {
        label: (event.currentTarget as HTMLInputElement).value,
      }
    })
  }
}
