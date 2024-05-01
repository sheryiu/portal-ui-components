import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Armor } from '../../../../../data/armor';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';

@Component({
  selector: 'mhw-armor-drawer-info',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
    RouterLink,
  ],
  templateUrl: './armor-drawer-info.component.html',
  styles: ``
})
export class ArmorDrawerInfoComponent {
  @Input() armor!: Armor | null | undefined;

}
