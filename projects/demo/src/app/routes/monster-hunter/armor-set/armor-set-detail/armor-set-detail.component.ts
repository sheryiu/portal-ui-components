import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { DirtyBarService, FieldModule, LayeredContainerComponent, SidebarModule, provideSearchSuggestions } from 'phead';
import { map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { ArmorSet } from '../../../../data/armor-set';
import { SharedModule } from '../../../../shared/shared.module';
import { ArmorSetBonusService } from '../../../../store/armor-set-bonus.service';
import { ArmorSetService } from '../../../../store/armor-set.service';

@Component({
  selector: 'app-armor-set-detail',
  standalone: true,
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    LayeredContainerComponent,
    ScrollingModule,
    SidebarModule,
    FieldModule,
  ],
  templateUrl: './armor-set-detail.component.html',
  styles: ``,
  providers: [
    provideSearchSuggestions({
      name: 'armorSetBonus',
      source: str$ => {
        const service = inject(ArmorSetBonusService);
        return str$.pipe(
          switchMap(str => service.list({ name: str ?? undefined })),
        )
      }
    })
  ]
})
export class ArmorSetDetailComponent extends EffectFn {
  private route = inject(ActivatedRoute);
  private service = inject(ArmorSetService);
  private formBuilder = inject(FormBuilder);
  private dirtyBar = inject(DirtyBarService);
  private id$ = this.route.paramMap.pipe(
    map(params => params.get('armorSetId')!),
  )
  data$ = this.id$.pipe(
    switchMap((id) => this.service.getOne(id)),
  )
  formControl = this.formBuilder.control<ArmorSet | null>(null);

  constructor() {
    super();
    this.data$.pipe(
      takeUntilDestroyed(),
    ).subscribe(data => {
      this.dirtyBar.setCurrentEditing(`Armor Set > ${ data?.name.en }`)
      this.updateForm(data);
    })
    this.dirtyBar.cancel$.pipe(
      withLatestFrom(this.data$),
      takeUntilDestroyed(),
    ).subscribe(([, data]) => {
      this.updateForm(data);
    })
    this.dirtyBar.save$.pipe(
      tap(() => this.dirtyBar.markAsLoading()),
      withLatestFrom(this.id$),
      switchMap(([, id]) => {
        const v = this.formControl.getRawValue();
        return v == null ? of(null) : this.service.update(id, v);
      }),
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.dirtyBar.markAsStable();
    })
  }

  onInput = this.createEffectFn<void>((args$) => args$.pipe(
    tap(() => this.formControl.dirty ? this.dirtyBar.markAsDirty() : this.dirtyBar.markAsPristine()),
  ))

  updateForm(data: ArmorSet | null | undefined) {
    if (!data) return;
    this.formControl.setValue(data);
    this.dirtyBar.markAsPristine();
  }
}
