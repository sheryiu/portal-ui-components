import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ToolbarItem } from './toolbar-item';

@Directive({
  selector: 'app-toolbar-button',
  standalone: true,
  providers: [
    {
      provide: ToolbarItem,
      useExisting: ToolbarButtonDirective,
    }
  ]
})
export class ToolbarButtonDirective extends ToolbarItem {

  public override type: string = 'button';

  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input() isDisabled?: boolean | null;
  @Output() toolbarClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    this.toolbarClick.emit(event);
  }

}
