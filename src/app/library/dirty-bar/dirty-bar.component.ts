import { Component, EventEmitter, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { EffectFn } from '@ngneat/effects-ng';
import { tap, throttleTime } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { DirtyBarService } from './dirty-bar.service';

@Component({
  selector: 'core-dirty-bar',
  standalone: true,
  imports: [
    SharedModule,
  ],
  templateUrl: './dirty-bar.component.html',
  host: {
    class: 'core-dirty-bar',
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
