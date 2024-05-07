import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { QuickAccessComponentDirective } from 'phead';
import { SharedModule } from '../../shared/shared.module';
import { DatabaseService } from '../../store/database.service';

@Component({
  selector: 'app-database-info-quick-access',
  standalone: true,
  imports: [
    SharedModule,
    QuickAccessComponentDirective
  ],
  templateUrl: './database-info-quick-access.component.html',
  host: {
    style: 'grid-column: 1 / span 2'
  }
})
export class DatabaseInfoQuickAccessComponent {
  private db = inject(DatabaseService);
  bytesUsed$$;

  constructor() {
    if (this.db.isServer || !this.db.bytesUsed$) return;
    this.bytesUsed$$ = toSignal(this.db.bytesUsed$);
  }
}
