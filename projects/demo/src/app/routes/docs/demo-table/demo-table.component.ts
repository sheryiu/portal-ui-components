import { Component, computed, signal } from '@angular/core';
import { BreadcrumbsComponent, LayeredContainerComponent, SegmentedOptionsModule, SidebarModule, TableModule } from 'portal-ui-ng';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'demo-demo-table',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    BreadcrumbsComponent,
    TableModule,
    SegmentedOptionsModule,
  ],
  templateUrl: './demo-table.component.html',
  styles: ``
})
export class DemoTableComponent {
  private data = [
    {
      "name": "Luke Skywalker",
      "height": "172 cm",
      "mass": "77 kg",
      "hair_color": "Blond",
      "eye_color": "Blue",
      "gender": "Male"
    },
    {
      "name": "Leia Organa",
      "height": "150 cm",
      "mass": "49 kg",
      "hair_color": "Brown",
      "eye_color": "Brown",
      "gender": "Female"
    },
    {
      "name": "Han Solo",
      "height": "180 cm",
      "mass": "80 kg",
      "hair_color": "Brown",
      "eye_color": "Brown",
      "gender": "Male"
    },
    {
      "name": "Darth Vader",
      "height": "202 cm",
      "mass": "136 kg",
      "hair_color": "None",
      "eye_color": "Yellow",
      "gender": "Male"
    },
    {
      "name": "Yoda",
      "height": "66 cm",
      "mass": "17 kg",
      "hair_color": "White",
      "eye_color": "Brown",
      "gender": "Male"
    },
    {
      "name": "Obi-Wan Kenobi",
      "height": "182 cm",
      "mass": "77 kg",
      "hair_color": "Auburn",
      "eye_color": "Blue",
      "gender": "Male"
    },
    {
      "name": "Padmé Amidala",
      "height": "165 cm",
      "mass": "45 kg",
      "hair_color": "Brown",
      "eye_color": "Brown",
      "gender": "Female"
    },
    {
      "name": "Anakin Skywalker",
      "height": "188 cm",
      "mass": "84 kg",
      "hair_color": "Blond",
      "eye_color": "Blue",
      "gender": "Male"
    },
    {
      "name": "Chewbacca",
      "height": "228 cm",
      "mass": "112 kg",
      "hair_color": "Brown",
      "eye_color": "Blue",
      "gender": "Male"
    },
    {
      "name": "Lando Calrissian",
      "height": "177 cm",
      "mass": "79 kg",
      "hair_color": "Black",
      "eye_color": "Brown",
      "gender": "Male"
    },
    {
      "name": "R2-D2",
      "height": "96 cm",
      "mass": "32 kg",
      "hair_color": "N/A",
      "eye_color": "Red",
      "gender": "N/A"
    },
    {
      "name": "C-3PO",
      "height": "167 cm",
      "mass": "75 kg",
      "hair_color": "N/A",
      "eye_color": "Yellow",
      "gender": "N/A"
    },
    {
      "name": "Rey",
      "height": "170 cm",
      "mass": "54 kg",
      "hair_color": "Brown",
      "eye_color": "Hazel",
      "gender": "Female"
    },
    {
      "name": "Finn",
      "height": "183 cm",
      "mass": "84 kg",
      "hair_color": "Black",
      "eye_color": "Dark Brown",
      "gender": "Male"
    },
    {
      "name": "Poe Dameron",
      "height": "174 cm",
      "mass": "80 kg",
      "hair_color": "Brown",
      "eye_color": "Brown",
      "gender": "Male"
    },
    {
      "name": "BB-8",
      "height": "67 cm",
      "mass": "18 kg",
      "hair_color": "N/A",
      "eye_color": "Black",
      "gender": "N/A"
    },
    {
      "name": "Kylo Ren",
      "height": "189 cm",
      "mass": "90 kg",
      "hair_color": "Black",
      "eye_color": "Dark",
      "gender": "Male"
    },
    {
      "name": "Mace Windu",
      "height": "188 cm",
      "mass": "84 kg",
      "hair_color": "Black",
      "eye_color": "Brown",
      "gender": "Male"
    },
    {
      "name": "Darth Maul",
      "height": "175 cm",
      "mass": "80 kg",
      "hair_color": "None",
      "eye_color": "Yellow",
      "gender": "Male"
    },
    {
      "name": "Qui-Gon Jinn",
      "height": "193 cm",
      "mass": "89 kg",
      "hair_color": "Brown",
      "eye_color": "Blue",
      "gender": "Male"
    }
  ]
  filter = signal<{ key: keyof DemoTableComponent['data'][number] | null, value: string | null }>({ key: null, value: null });
  sort = signal<{ key: keyof DemoTableComponent['data'][number], direction: 'asc' | 'desc' }>({ key: 'name', direction: 'asc' });
  filtered = computed(() => {
    return this.data.toSorted((a, b) => (a[this.sort().key] > b[this.sort().key] ? -1 : 1) * (this.sort().direction === 'desc' ? 1 : -1))
      .filter(t => this.filter().key == null ? true : t[this.filter().key!].toLowerCase().includes(this.filter().value?.toLowerCase() ?? ''))
  });

}
