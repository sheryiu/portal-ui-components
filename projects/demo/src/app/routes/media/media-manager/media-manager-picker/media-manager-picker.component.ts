import { Component } from '@angular/core';
import { LayoutControlDirective } from 'portal-ui-ng/pages';
import { MediaManagerFolderComponent } from "../media-manager-folder/media-manager-folder.component";

@Component({
  selector: 'demo-media-manager-picker',
  imports: [MediaManagerFolderComponent, LayoutControlDirective],
  templateUrl: './media-manager-picker.component.html',
})
export class MediaManagerPickerComponent {

}
