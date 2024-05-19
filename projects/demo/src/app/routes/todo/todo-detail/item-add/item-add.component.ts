import { TextFieldModule } from '@angular/cdk/text-field';
import { Component, output } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'demo-item-add',
  standalone: true,
  imports: [
    SharedModule,
    TextFieldModule,
  ],
  templateUrl: './item-add.component.html',
  styles: ``
})
export class ItemAddComponent {
  addItem = output<{ description: string }>();

  onKeypress(event: KeyboardEvent) {
    if (event.shiftKey == false && event.code == 'Enter') {
      event.preventDefault();
      this.addItem.emit({ description: (event.target as HTMLInputElement).value.trim() });
      (event.target as HTMLInputElement).value = ''
      return;
    }
  }
}
