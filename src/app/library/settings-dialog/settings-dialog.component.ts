import { Component, NgZone, Renderer2, inject } from '@angular/core';
import { EffectFn } from '@ngneat/effects-ng';
import { ExportProgress } from 'dexie-export-import/dist/export';
import { ImportProgress } from 'dexie-export-import/dist/import';
import { BehaviorSubject, Observable, concatMap, defer, exhaustMap, filter, from, map, pairwise, shareReplay, switchMap, take, tap, timer } from 'rxjs';
import { OverlayRefExtra } from '../../components/overlay/overlay-ref-extra';
import { DatabaseService } from '../../data/database.service';
import { SharedModule } from '../../shared/shared.module';
import { LibraryModule } from '../library.module';

@Component({
  selector: 'core-settings-dialog',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
  ],
  templateUrl: './settings-dialog.component.html',
  styles: ``
})
export class SettingsDialogComponent extends EffectFn {
  private overlayRef = inject(OverlayRefExtra);
  private service = inject(DatabaseService);
  private renderer = inject(Renderer2);
  private zone = inject(NgZone);

  bytesUsed$ = this.service.bytesUsed$;
  private _downloadProgress$ = new BehaviorSubject<ExportProgress | undefined>(undefined);
  downloadProgress$ = this._downloadProgress$.pipe(
    pairwise(),
    concatMap(([oldV, newV]) => timer((oldV == null || newV?.completedRows == 0) ? 0 : 300).pipe(
      map(() => newV),
    )),
    shareReplay(1),
  )
  private _uploadProgress$ = new BehaviorSubject<ImportProgress | undefined>(undefined);
  uploadProgress$ = this._uploadProgress$.pipe(
    pairwise(),
    concatMap(([oldV, newV]) => timer((oldV == null || newV?.completedRows == 0) ? 0 : 300).pipe(
      map(() => newV),
    )),
    shareReplay(1),
  )

  currentTab = 'database';

  onGotoTab(tab: string) {
    this.currentTab = tab;
  }

  onDownloadClick = this.createEffectFn<void>(args$ => args$.pipe(
    exhaustMap(() => from(this.service.export({
      progressCallback: (progress) => {
        this.zone.run(() => {
          this._downloadProgress$.next({ ...progress });
          if (progress.done) {
            this._downloadProgress$.next(undefined);
          }
        })
        return true
      }
    })).pipe(
      switchMap(blob => defer(() => this.downloadProgress$.pipe(
        filter(v => v == null),
        take(1),
        map(() => blob),
      ))),
      tap(blob => {
        const a: HTMLAnchorElement = this.renderer.createElement('a');
        a.download = 'download.json';
        a.href = URL.createObjectURL(new Blob([blob]));
        a.click();
        URL.revokeObjectURL(a.href);
      }),
    )),
  ))

  onUploadClick = this.createEffectFn<void>(args$ => args$.pipe(
    exhaustMap(() => {
      return new Observable<ArrayBuffer>(subscriber => {
        const input = this.renderer.createElement('input') as HTMLInputElement;
        input.type = 'file';
        input.accept = 'application/json';
        input.addEventListener('change', () => {
          const fr = new FileReader();
          fr.addEventListener('load', () => {
            subscriber.next(fr.result as ArrayBuffer);
            subscriber.complete();
          })
          fr.readAsArrayBuffer(input.files![0]);
        })
        input.click();
      }).pipe(
        switchMap((ar) => this.service.import(
          new Blob([ar]),
          {
            clearTablesBeforeImport: true,
            progressCallback: (progress) => {
              this.zone.run(() => {
                this._uploadProgress$.next({ ...progress });
                if (progress.done) {
                  this._uploadProgress$.next(undefined);
                }
              })
              return true;
            }
          }
        )),
        switchMap(() => defer(() => this.uploadProgress$.pipe(
          filter(v => v == null),
          take(1),
        ))),
      )
    }),
  ))

  onDeleteAllClick() {
    this.service.emptyDatabase();
  }
}
