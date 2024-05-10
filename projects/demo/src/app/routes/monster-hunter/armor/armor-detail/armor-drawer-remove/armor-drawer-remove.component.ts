import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { AccordionModule, ModalDialogData, ModalDialogService, SidebarModule } from 'phead';
import { EMPTY, Observable, catchError, exhaustMap, tap } from 'rxjs';
import { Armor } from '../../../../../data/armor';
import { SharedModule } from '../../../../../shared/shared.module';
import { ArmorService } from '../../../../../store/armor.service';
import { RemoveConfirmComponent } from './remove-confirm/remove-confirm.component';

@Component({
  selector: 'mhw-skill-drawer-remove',
  standalone: true,
  imports: [
    SharedModule,
    AccordionModule,
    SidebarModule,
  ],
  templateUrl: './armor-drawer-remove.component.html',
  styles: ``
})
export class ArmorDrawerRemoveComponent extends EffectFn {
  @Input({ required: true }) armor!: Armor | null | undefined;
  private service = inject(ArmorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dialog = inject(ModalDialogService);

  onRemoveClick = this.createEffectFn<void>(args$ => args$.pipe(
    exhaustMap(() => {
      return new Observable(subscriber => {
        const options: ModalDialogData<RemoveConfirmComponent> = {
          title: 'Are you sure to remove?',
          icon: 'delete_forever',
          actions: [
            {
              label: 'Cancel',
              onClick: () => {
                subscriber.complete();
                dialogRef.close();
              }
            },
            {
              label: 'Confirm',
              disabled: true,
              color: 'red',
              onClick: () => {
                subscriber.complete();
                dialogRef.close();
              }
            },
          ],
          detailsComponent: RemoveConfirmComponent,
          onDetailsComponentAttached: (ref) => {
            ref.setInput('stringToCheck', this.armor?.name.en ?? 'Confirm Removal');
            ref.instance.matches$.subscribe(matches => {
              options.actions!.at(1)!.disabled = !matches
            })
          }
        }
        const dialogRef = this.dialog.open(options)
        dialogRef.afterClosed$.subscribe({
          next: () => subscriber.complete(),
          complete: () => subscriber.complete(),
        })
      })
    }),
    exhaustMap(() => this.service.remove(this.armor!.id).pipe(
      catchError((e: Error) => {
        this.dialog.open({
          title: 'Error',
          icon: 'error',
          details: e.message,
          dialogClass: 'error-dialog',
        });
        return EMPTY;
      }),
    )),
    tap(() => this.router.navigate(['../'], { relativeTo: this.route, replaceUrl: true }))
  ))
}
