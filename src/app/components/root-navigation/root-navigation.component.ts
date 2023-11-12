import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonsModule } from '../atoms/buttons/buttons.module';
import { RootNavigationService } from './root-navigation.service';

@Component({
  selector: 'app-root-navigation',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ButtonsModule,
    NgOptimizedImage,
  ],
  templateUrl: './root-navigation.component.html',
  styleUrl: './root-navigation.component.css',
})
export class RootNavigationComponent {
  private service = inject(RootNavigationService);
  route = inject(ActivatedRoute);

  tabs$ = this.service.tabs$;
}
