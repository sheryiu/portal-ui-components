import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EffectFn } from '@ngneat/effects-ng';
import { AccordionModule, DropdownModule, FieldModule, ModalDialogService, SidebarModule } from 'phead';
import { EMPTY, catchError, exhaustMap, tap } from 'rxjs';
import { ArmorCreateInput, ArmorPosition } from '../../../../../data/armor';
import { SharedModule } from '../../../../../shared/shared.module';
import { ArmorService } from '../../../../../store/armor.service';
import { ArmorSetSearchComponent } from '../../../utils/armor-set-search/armor-set-search.component';

@Component({
  selector: 'mhw-armor-list-drawer-create',
  standalone: true,
  imports: [
    SharedModule,
    AccordionModule,
    SidebarModule,
    FieldModule,
    DropdownModule,
    ArmorSetSearchComponent,
  ],
  templateUrl: './armor-list-drawer-create.component.html',
  styles: ``
})
export class ArmorListDrawerCreateComponent extends EffectFn {
  private service = inject(ArmorService);
  private builder = inject(FormBuilder);
  private dialog = inject(ModalDialogService);
  formControl = this.builder.nonNullable.control<ArmorCreateInput | null>(null);
  armorPosition = Object.values(ArmorPosition);

  onSubmit = this.createEffectFn<void>(args$ => args$.pipe(
    exhaustMap(() =>
      this.service.create(this.formControl.value!).pipe(
        catchError((e: Error) => {
          this.dialog.open({
            title: 'Error',
            icon: 'error',
            details: e.message,
            dialogClass: 'error-dialog',
          });
          return EMPTY;
        })
      )
    ),
    tap(() => this.formControl.reset()),
  ))
}
