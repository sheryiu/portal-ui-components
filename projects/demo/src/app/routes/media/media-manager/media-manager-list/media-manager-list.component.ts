import { DecimalPipe } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HoverableDirective } from 'portal-ui-ng/base';
import { TableModule, TimeDisplayComponent } from 'portal-ui-ng/components';
import { Media, MediaType } from '../../../../data/media.types';

@Component({
  selector: 'demo-media-manager-list',
  standalone: true,
  imports: [RouterLink, TableModule, HoverableDirective, DecimalPipe, TimeDisplayComponent],
  templateUrl: './media-manager-list.component.html',
  styles: ``
})
export class MediaManagerListComponent {
  media = input.required<Media[]>()
  navigateWithRouter = input.required<boolean>()
  navigateTo = output<Media>()

  processed = computed(() => {
    return this.media()
      .toSorted((a, b) => a.filename < b.filename ? -1 : a.filename > b.filename ? 1 : 0)
      .toSorted((a, b) => a.type == b.type ? 0 : a.type == MediaType.FOLDER ? -1 : b.type == MediaType.FOLDER ? 1 : 0)
  })

  folders = computed(() => {
    return this.processed().filter(media => media.type == MediaType.FOLDER)
  })
  files = computed(() => {
    return this.processed().filter(media => media.type == MediaType.FILE)
  })

  rowType!: Media;
  mediaType = MediaType
}
