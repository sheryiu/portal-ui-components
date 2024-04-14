import { Component, inject } from '@angular/core';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { ArmorService } from '../../../../../store/armor.service';

@Component({
  selector: 'mhw-armor-create',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
  ],
  templateUrl: './armor-create.component.html',
  styles: ``
})
export class ArmorCreateComponent {
  private service = inject(ArmorService);
  rows = [
    {
      id: 'name',
      label: 'Name',
    },
    {
      id: 'armorSetId',
      label: 'Armor Set',
    },
    {
      id: 'position',
      label: 'Position',
    },
  ]

  trackingFn(index: number, item: ArmorCreateComponent['rows'][number]) {
    return item.id;
  }
}
