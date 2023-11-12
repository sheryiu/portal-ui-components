import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonsModule } from '../atoms/buttons/buttons.module';
import { PaneNavigationService } from './pane-navigation.service';

@Component({
  selector: 'app-pane-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonsModule],
  templateUrl: './pane-navigation.component.html',
  styleUrl: './pane-navigation.component.css'
})
export class PaneNavigationComponent {

  private service = inject(PaneNavigationService);
  route = inject(ActivatedRoute);

  tabs$ = this.service.tabs$;

}
