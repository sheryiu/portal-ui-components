import { Directive } from '@angular/core';
import { ToolbarItem } from './toolbar-item';

@Directive({
  selector: 'app-toolbar-divider',
  standalone: true,
  providers: [
    {
      provide: ToolbarItem,
      useExisting: ToolbarDividerDirective,
    }
  ]
})
export class ToolbarDividerDirective extends ToolbarItem {
  public override type: string = 'divider';
}
