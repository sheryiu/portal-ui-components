import { NgModule } from '@angular/core';
import { EditToolbarComponent } from './edit-toolbar/edit-toolbar.component';
import { ToolbarButtonDirective } from './toolbar-button.directive';
import { ToolbarCustomViewDirective } from './toolbar-custom-view.directive';
import { ToolbarDividerDirective } from './toolbar-divider.directive';
import { ToolbarLinkDirective } from './toolbar-link.directive';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  declarations: [],
  imports: [
    ToolbarComponent,
    EditToolbarComponent,
    ToolbarButtonDirective,
    ToolbarDividerDirective,
    ToolbarLinkDirective,
    ToolbarCustomViewDirective,
  ],
  exports: [
    ToolbarComponent,
    EditToolbarComponent,
    ToolbarButtonDirective,
    ToolbarDividerDirective,
    ToolbarLinkDirective,
    ToolbarCustomViewDirective,
  ]
})
export class ToolbarModule { }
