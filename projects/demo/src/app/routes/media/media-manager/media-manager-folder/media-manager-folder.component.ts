import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DividerComponent } from "portal-ui-ng/components";
import { MediaDataService } from '../../../../data/media-data.service';
import { Media } from '../../../../data/media.types';
import { MediaManagerGridComponent } from "../media-manager-grid/media-manager-grid.component";
import { MediaManagerListComponent } from '../media-manager-list/media-manager-list.component';
import { MediaManagerToolbarComponent } from "../media-manager-toolbar/media-manager-toolbar.component";

@Component({
  selector: 'demo-media-manager-folder',
  standalone: true,
  imports: [MediaManagerToolbarComponent, DividerComponent, MediaManagerGridComponent, MediaManagerListComponent],
  templateUrl: './media-manager-folder.component.html',
  styles: ``
})
export class MediaManagerFolderComponent {
  private dataService = inject(MediaDataService)
  folderId = input<Media['belongsInFolderId']>()
  // TODO change to linkedSignal after changing to angular 19
  currentFolderId = signal<string | null>(null)
  navigateWithRouter = input(true)
  viewMode = signal<'grid' | 'list'>('grid')

  private allMedia = toSignal(this.dataService.getList())

  children = computed(() => this.allMedia()?.filter(media => media.belongsInFolderId == this.currentFolderId()))
  /** in the order: self, parent, grandparent, grand-grandparent, ..., root */
  parentFolders = computed(() => {
    const folderId = this.currentFolderId();
    const allMedia = this.allMedia();
    if (allMedia == null) return [];
    let media = allMedia.find(m => m.id == folderId) ?? null;
    let parentMediaId = media?.belongsInFolderId ?? null;
    let parents = [] as (null | Media)[];
    do {
      parents = parents.toSpliced(parents.length, 0, media ?? null);
      if (media == null) break;
      media = allMedia.find(m => m.id == parentMediaId) ?? null;
      parentMediaId = media?.belongsInFolderId ?? null;
    } while (true);
    return parents;
  })

  constructor() {
    effect(() => {
      this.currentFolderId.set(this.folderId() ?? null)
    }, { allowSignalWrites: true })
  }

  onNavigateTo(folder: Media | null) {
    this.currentFolderId.set(folder?.id ?? null)
  }
}
