import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EffectFn } from '@ngneat/effects-ng';
import { exhaustMap, filter, tap } from 'rxjs';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { ArmorSetCreateInput, ArmorSetService } from '../../../../../store/armor-set.service';

@Component({
  selector: 'mhw-armor-set-create',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
  ],
  templateUrl: './armor-set-create.component.html',
  styles: ``
})
export class ArmorSetCreateComponent extends EffectFn {
  private service = inject(ArmorSetService);
  private builder = inject(FormBuilder);
  formControl = this.builder.control<ArmorSetCreateInput | null>(null);

  onSubmit = this.createEffectFn<void>(args$ => args$.pipe(
    filter(() => this.formControl.value != null),
    exhaustMap(() =>
      this.service.create(this.formControl.value!)
    ),
    tap(() => this.formControl.reset()),
  ))

  expanded = false;

  toggleState() {
    this.expanded = !this.expanded;
  }

}
