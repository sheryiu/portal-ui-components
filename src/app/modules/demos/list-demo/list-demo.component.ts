import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-list-demo',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent],
  templateUrl: './list-demo.component.html',
  styleUrl: './list-demo.component.css'
})
export class ListDemoComponent {

}
