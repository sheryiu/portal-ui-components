import { ScrollingModule } from '@angular/cdk/scrolling';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { ButtonModule, DividerComponent, FieldModule, LayeredContainerComponent, SidebarModule } from 'portal-ui-ng';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import { ArmorSet } from '../../../../data/armor-set';
import { SharedModule } from '../../../../shared/shared.module';
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
    DividerComponent,
    ButtonModule,
  ],
  templateUrl: './armor-set-detail.component.html',
  styles: ``,
})
export class ArmorSetDetailComponent extends EffectFn {
  private route = inject(ActivatedRoute);
  private service = inject(ArmorSetService);
  private formBuilder = inject(FormBuilder);
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
      this.updateForm(data);
    })
  }

  onCancel = this.createEffectFn<void>(args$ => args$.pipe(
    withLatestFrom(this.data$),
    tap(([, data]) => this.updateForm(data))
  ))

  onSave = this.createEffectFn<void>(args$ => args$.pipe(
    withLatestFrom(this.id$),
    tap(([, id]) => this.service.update(id, this.formControl.getRawValue()!))
  ))

  updateForm(data: ArmorSet | null | undefined) {
    if (!data) return;
    this.formControl.reset(data);
  }
}
