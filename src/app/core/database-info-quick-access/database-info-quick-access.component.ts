import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DatabaseService } from '../../data/database.service';
import { LibraryModule } from '../../library/library.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-database-info-quick-access',
  standalone: true,
  imports: [
    SharedModule,
    LibraryModule,
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
