import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {

}
