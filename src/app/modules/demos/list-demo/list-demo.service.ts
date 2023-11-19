import { Injectable } from '@angular/core';
import { nanoid } from 'nanoid';
import { Observable, map, of, timer } from 'rxjs';
import { adjectives, colors, names, starWars, uniqueNamesGenerator } from 'unique-names-generator';

export type StockTransactionDataType = {
  id: string;
  companyName: string;
  transactionAmount: number;
  transactionBy: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ListDemoService {

  getStockTransactions(companyCount: number): Observable<StockTransactionDataType[]> {
    const companies = Array(companyCount).fill(0).map(() => uniqueNamesGenerator({
      dictionaries: [[...adjectives, ...colors], names, ['Inc.', 'Limited', 'Co.', 'Ltd.', 'Company']],
      separator: ' ',
      style: 'capital'
    }));
    return timer(1000).pipe(
      map(() => Array(1000).fill(0).map((_, i) => ({
        id: nanoid(),
        companyName: companies[Math.floor(Math.random() * companies.length)],
        transactionAmount: Math.floor(Math.random() * 2000 - 1000) / 10,
        transactionBy: uniqueNamesGenerator({
          dictionaries: [starWars],
        }),
        timestamp: new Date(new Date().getTime() - i * 1000_000)
      })))
    )
  }
}
