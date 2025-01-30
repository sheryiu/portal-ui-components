import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MediaManagerFolderComponent } from "./media-manager-folder/media-manager-folder.component";

@Component({
  selector: 'demo-media-manager',
  standalone: true,
  imports: [MediaManagerFolderComponent],
  templateUrl: './media-manager.component.html',
  styles: ``
})
export class MediaManagerComponent {
  private route = inject(ActivatedRoute);

  folderId = toSignal(this.route.params.pipe(
    map(params => params['folderId'] as string),
    map(folderId => folderId == null ? null : folderId),
  ), { initialValue: null })
}
