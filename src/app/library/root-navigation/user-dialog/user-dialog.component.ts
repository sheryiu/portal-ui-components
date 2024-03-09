import { isPlatformServer } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import Dexie from 'dexie';
import { Observable, from, map, startWith, switchMap } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    SharedModule,
    ThemeToggleComponent,
  ],
  templateUrl: './user-dialog.component.html',
  styles: ``
})
export class UserDialogComponent {
  private platformId = inject(PLATFORM_ID);

  tmpStorage$ = new Observable(subscriber => {
    if (isPlatformServer(this.platformId)) return;
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
