import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaneNavigationComponent } from '../pane-navigation/pane-navigation.component';

@Component({
  selector: 'app-pane-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, PaneNavigationComponent],
  templateUrl: './pane-layout.component.html',
  styleUrl: './pane-layout.component.css',
  host: {
    class: 'grow'
  }
})
export class PaneLayoutComponent {}
