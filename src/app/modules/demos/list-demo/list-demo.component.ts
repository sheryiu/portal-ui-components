import { ArrayDataSource } from '@angular/cdk/collections';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonsModule } from '../../../components/atoms/buttons/buttons.module';
import { TableModule } from '../../../components/atoms/table/table.module';
import { BreadcrumbsComponent } from '../../../components/breadcrumbs/breadcrumbs.component';
import { ListDemoService, StockTransactionDataType } from './list-demo.service';

@Component({
  selector: 'app-list-demo',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent, ButtonsModule, TableModule],
  templateUrl: './list-demo.component.html',
  styleUrl: './list-demo.component.css'
})
export class ListDemoComponent {

  dataSource = new ArrayDataSource<StockTransactionDataType>([]);
  columnsToDisplay = ['companyName', 'transactionAmount', 'transactionBy', 'timestamp'];

  private service = inject(ListDemoService);

  constructor() {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      this.service.getStockTransactions(10).pipe(
        takeUntilDestroyed(),
      ).subscribe(data => {
        this.dataSource = new ArrayDataSource<StockTransactionDataType>(data);
      })
    }
  }

  trackingFn(index: number, item: StockTransactionDataType) {
    return item.id;
  }
}
