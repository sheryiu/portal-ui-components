import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccordionModule, SidebarModule, TimeDisplayComponent } from 'phead';
import { Armor } from '../../../../../data/armor';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'mhw-skill-drawer-info',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    AccordionModule,
    SidebarModule,
    TimeDisplayComponent,
  ],
  templateUrl: './armor-drawer-info.component.html',
  styles: ``
})
export class ArmorDrawerInfoComponent {
  @Input() armor!: Armor | null | undefined;

}
