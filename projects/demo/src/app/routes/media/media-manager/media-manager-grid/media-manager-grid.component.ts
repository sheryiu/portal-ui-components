import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'portal-ui-ng/base';
import { Media, MediaType } from '../../../../data/media.types';

@Component({
  selector: 'demo-media-manager-grid',
  imports: [ButtonModule, RouterLink],
  templateUrl: './media-manager-grid.component.html',
})
export class MediaManagerGridComponent {
  media = input.required<Media[]>()
  navigateWithRouter = input.required<boolean>()
  navigateTo = output<Media>()

  processed = computed(() => {
    return this.media()
      .toSorted((a, b) => a.filename < b.filename ? -1 : a.filename > b.filename ? 1 : 0)
  })

  folders = computed(() => {
    return this.processed().filter(media => media.type == MediaType.FOLDER)
  })
  files = computed(() => {
    return this.processed().filter(media => media.type == MediaType.FILE)
  })
}
