import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  selector: 'pui-divider',
  standalone: true,
  template: '<div role="presentation" [attr.data-vertical]="vertical()"></div>',
  host: {
    class: 'pui-divider'
  },
})
export class DividerComponent {
  vertical = input(false, { transform: booleanAttribute })
}
