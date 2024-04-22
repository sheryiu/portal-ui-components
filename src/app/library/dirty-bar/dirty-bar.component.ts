import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class DirtyBarComponent {
  private service = inject(DirtyBarService);
  isDirty = false;

  constructor() {
    this.service.isDirty$.pipe(
      takeUntilDestroyed(),
    ).subscribe(isDirty => this.isDirty = isDirty)
  }

}
