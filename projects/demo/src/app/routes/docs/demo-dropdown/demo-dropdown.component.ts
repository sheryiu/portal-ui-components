import { Component, computed, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsComponent, DropdownModule, LayeredContainerComponent, SidebarModule } from 'portal-ui-ng';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'demo-demo-dropdown',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './demo-dropdown.component.html',
  styles: ``
})
export class DemoDropdownComponent {
  data = [
    'Apple',
    'Banana',
    'Cherry',
    'Durian',
    'Eggplant',
    'Feijoa',
    'Grape',
    'Huckleberry',
    'Indian Gooseberry',
    'Jackfruit',
    'Kiwi',
    'Lemon',
    'Mango',
    'Nectarine',
    'Olive',
    'Pineapple',
  ]
  private search = signal<string>('')
  filtered = computed(() => {
    return this.data.filter(d => d.toLowerCase().includes(this.search().toLowerCase()));
  })

  formControl1 = new FormControl(null as string | null)
  formControl2 = new FormControl(null as string | null)

  onSearch(term: string) {
    this.search.set(term)
  }
}
