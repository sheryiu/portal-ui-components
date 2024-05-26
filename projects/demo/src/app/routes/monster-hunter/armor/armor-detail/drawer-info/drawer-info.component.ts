import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AccordionModule, SidebarModule, TimeDisplayComponent } from 'portal-ui-ng';
import { Armor } from '../../../../../data/armor';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'mhw-drawer-info',
  standalone: true,
  imports: [
    SharedModule,
    RouterLink,
    AccordionModule,
    SidebarModule,
    TimeDisplayComponent,
  ],
  templateUrl: './drawer-info.component.html',
  styles: ``
})
export class DrawerInfoComponent {
  @Input() armor!: Armor | null | undefined;

}
