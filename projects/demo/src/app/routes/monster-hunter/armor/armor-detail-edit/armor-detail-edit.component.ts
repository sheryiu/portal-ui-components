import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { DropdownModule, FieldModule, LayeredContainerComponent, SidebarModule } from 'phead';
import { map, switchMap } from 'rxjs';
import { Armor, ArmorPosition, ArmorUpdateInput } from '../../../../data/armor';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorService } from '../../../../store/armor.service';
import { ArmorSetSearchComponent } from '../../utils/armor-set-search/armor-set-search.component';

@Component({
  selector: 'app-armor-detail-edit',
  standalone: true,
  imports: [
    SharedModule,
    LayeredContainerComponent,
    SidebarModule,
    FieldModule,
    DropdownModule,
    ArmorSetSearchComponent,
  ],
  templateUrl: './armor-detail-edit.component.html',
  styles: ``
})
export class ArmorDetailEditComponent extends EffectFn {
  private service = inject(ArmorService);
  private builder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private id$ = this.route.paramMap.pipe(
    map(params => params.get('armorId')!),
  )
  data$ = this.id$.pipe(
    switchMap((id) => this.service.getOne(id)),
  )
  formControl = this.builder.control<ArmorUpdateInput | null>(null);

  armorPosition = Object.values(ArmorPosition);

  constructor() {
    super();
    this.data$.pipe(
      takeUntilDestroyed(),
    ).subscribe(data => {
      this.updateForm(data);
    })
  }

  onInput = this.createEffectFn<void>((args$) => args$.pipe(
    // tap(() => this.formControl.dirty ? this.dirtyBar.markAsDirty() : this.dirtyBar.markAsPristine()),
  ))

  updateForm(data: Armor | null | undefined) {
    if (!data) return;
    this.formControl.setValue(data);
  }

}
