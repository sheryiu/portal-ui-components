import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonsModule } from '../atoms/buttons/buttons.module';
import { BreadcrumbsService } from './breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, ButtonsModule, RouterLink, RouterLinkActive],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css',
})
export class BreadcrumbsComponent {

  private service = inject(BreadcrumbsService);
  breadcrumbs$ = this.service.breadcrumbs$;

  @HostBinding('class') private hostClass = 'contents';

}
