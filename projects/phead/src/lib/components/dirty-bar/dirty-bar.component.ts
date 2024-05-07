import { Component, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { EffectFn } from '@ngneat/effects-ng';
import { HardSurfaceDirective, HoverableDirective } from '../../base';
import { DirtyBarService } from './dirty-bar.service';

@Component({
  selector: 'phead-dirty-bar',
  standalone: true,
  imports: [
    HoverableDirective,
    HardSurfaceDirective,
  ],
  templateUrl: './dirty-bar.component.html',
  host: {
    class: 'phead-dirty-bar',
    '[class.hidden]': '!isDirty'
  }
})
export class DirtyBarComponent extends EffectFn {
  private service = inject(DirtyBarService);
  isDirty = false;
  currentEditing$$ = toSignal(this.service.currentEditing$);
  isLoading$$ = toSignal(this.service.isLoading$);

  constructor() {
    super();
    this.service.isDirty$.pipe(
      takeUntilDestroyed(),
    ).subscribe(isDirty => this.isDirty = isDirty);
  }

  onCancel() {
    this.service.cancelClick();
  }

  onSave() {
    this.service.saveClick();
  }

}
