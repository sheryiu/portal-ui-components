import { Component } from '@angular/core';

@Component({
  selector: 'phead-divider',
  standalone: true,
  template: '<div role="presentation"></div>',
  host: {
    class: 'phead-divider'
  }
})
export class DividerComponent {

}
