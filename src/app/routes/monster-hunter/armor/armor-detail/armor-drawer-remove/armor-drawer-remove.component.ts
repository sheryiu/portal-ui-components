import { Component, Input, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EffectFn } from '@ngneat/effects-ng';
import { EMPTY, catchError, exhaustMap, filter, tap } from 'rxjs';
import { Armor } from '../../../../../data/armor';
import { LibraryModule } from '../../../../../library/library.module';
import { SharedModule } from '../../../../../shared/shared.module';
import { ArmorService } from '../../../../../store/armor.service';

@Component({
  selector: 'mhw-armor-drawer-remove',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
  ],
  templateUrl: './armor-drawer-remove.component.html',
  styles: ``
})
export class ArmorDrawerRemoveComponent extends EffectFn {
  @Input({ required: true }) armor!: Armor | null | undefined;
  private service = inject(ArmorService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  onRemoveClick = this.createEffectFn<void>(args$ => args$.pipe(
    filter(() => this.armor != null),
    exhaustMap(() => this.service.remove(this.armor!.id).pipe(
      catchError(() => EMPTY),
    )),
    tap(() => this.router.navigate(['../'], { relativeTo: this.route, replaceUrl: true }))
  ))
}
