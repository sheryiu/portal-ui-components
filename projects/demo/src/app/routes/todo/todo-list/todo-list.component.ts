import { Component, inject } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AccordionModule, BreadcrumbsComponent, DividerComponent, LayeredContainerComponent, SegmentedOptionsModule, SidebarModule } from 'portal-ui-ng';
import { switchMap } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { TodoService } from '../core/todo.service';
import { DrawerAddComponent } from './drawer-add/drawer-add.component';
import { TodoCardComponent } from './todo-card/todo-card.component';

@Component({
  selector: 'demo-todo-list',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
    DividerComponent,
    TodoCardComponent,
    AccordionModule,
    DrawerAddComponent,
    SegmentedOptionsModule,
  ],
  templateUrl: './todo-list.component.html',
  styles: ``
})
export class TodoListComponent {
  private service = inject(TodoService);

  filter = this.service.mainFilter;
  private filter$ = toObservable(this.filter);
  list = toSignal(this.filter$.pipe(
    switchMap(filter => this.service.list(filter)),
  ));
}
