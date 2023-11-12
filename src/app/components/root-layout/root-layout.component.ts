import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RootNavigationComponent } from '../root-navigation/root-navigation.component';

@Component({
  selector: 'app-root-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RootNavigationComponent],
  templateUrl: './root-layout.component.html',
  styleUrl: './root-layout.component.css'
})
export class RootLayoutComponent {

}
