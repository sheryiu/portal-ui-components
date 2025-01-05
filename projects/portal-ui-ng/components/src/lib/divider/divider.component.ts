import { Component } from '@angular/core';

@Component({
  selector: 'pui-divider',
  standalone: true,
  template: '<div role="presentation"></div>',
  host: {
    class: 'pui-divider'
  }
})
export class DividerComponent {

}
