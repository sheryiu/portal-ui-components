import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DividerComponent } from "portal-ui-ng/components";
import { MediaDataService } from '../../../../data/media-data.service';
import { Media } from '../../../../data/media.types';
import { MediaManagerGridComponent } from "../media-manager-grid/media-manager-grid.component";
import { MediaManagerToolbarComponent } from "../media-manager-toolbar/media-manager-toolbar.component";

@Component({
  selector: 'demo-media-manager-folder',
  standalone: true,
  imports: [MediaManagerToolbarComponent, DividerComponent, MediaManagerGridComponent],
  templateUrl: './media-manager-folder.component.html',
  styles: ``
})
export class MediaManagerFolderComponent {
  private dataService = inject(MediaDataService)
  folderId = input.required<Media['belongsInFolderId']>()

  private allMedia = toSignal(this.dataService.getList())

  mediaInFolder = computed(() => this.allMedia()?.filter(media => media.belongsInFolderId == this.folderId()))
}
