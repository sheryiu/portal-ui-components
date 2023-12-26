import { Directive, TemplateRef, inject } from '@angular/core';
import { ToolbarItem } from './toolbar-item';

@Directive({
  selector: '[appToolbarCustomView]',
  standalone: true,
  providers: [
    {
      provide: ToolbarItem,
      useExisting: ToolbarCustomViewDirective,
    }
  ]
})
export class ToolbarCustomViewDirective extends ToolbarItem {

  public override type: string = 'custom-view';

  templateRef = inject(TemplateRef);
}
