import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EffectFn } from '@ngneat/effects-ng';
import { AccordionModule, FieldModule, ModalDialogService, SidebarModule } from 'phead';
import { EMPTY, catchError, exhaustMap, filter, tap } from 'rxjs';
import { ArmorCreateInput, ArmorPosition } from '../../../../../data/armor';
import { SharedModule } from '../../../../../shared/shared.module';
import { ArmorService } from '../../../../../store/armor.service';

@Component({
  selector: 'mhw-armor-list-drawer-create',
  standalone: true,
  imports: [
    SharedModule,
    AccordionModule,
    SidebarModule,
    FieldModule,
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
          console.log(e)
          this.dialog.open();
          return EMPTY;
        })
      )
    ),
    tap(() => this.formControl.reset()),
  ))
}
