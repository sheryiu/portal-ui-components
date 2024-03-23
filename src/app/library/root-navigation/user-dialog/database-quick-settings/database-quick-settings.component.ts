import { isPlatformServer } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import Dexie from 'dexie';
import { Observable, from, map, startWith, switchMap } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-database-quick-settings',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './database-quick-settings.component.html',
  styles: ``,
  host: {
    class: 'col-span-2'
  }
})
export class DatabaseQuickSettingsComponent {

  private isServer = isPlatformServer(inject(PLATFORM_ID))

  bytesUsed$ = new Observable(subscriber => {
    if (this.isServer) return;
    const listener = () => {
      subscriber.next(null);
    }
    Dexie.on('storagemutated', listener);
    return () => Dexie.on('storagemutated').unsubscribe(listener);
  }).pipe(
    startWith(null),
    switchMap(() => from(navigator.storage.estimate())),
    map(storage => storage.usage)
  )

}
