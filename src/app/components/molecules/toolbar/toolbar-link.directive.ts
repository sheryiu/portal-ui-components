import { Directive, Input } from '@angular/core';
import { ToolbarItem } from './toolbar-item';

@Directive({
  selector: 'app-toolbar-link',
  standalone: true,
  providers: [
    {
      provide: ToolbarItem,
      useExisting: ToolbarLinkDirective,
    }
  ]
})
export class ToolbarLinkDirective extends ToolbarItem {
  public override type: string = 'link';

  @Input({ required: true }) link!: any[];
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;

}
