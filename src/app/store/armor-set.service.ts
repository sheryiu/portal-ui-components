import { Injectable, inject, signal } from '@angular/core';
import { liveQuery } from 'dexie';
import { nanoid } from 'nanoid';
import { delayWhen, from, of, shareReplay, startWith, timer } from 'rxjs';
import { ArmorSet } from '../data/armor-set';
import { DatabaseService } from '../data/database.service';
import { memoize } from './memoize';

type Filter = {
  name?: string;
  rarityFrom?: number;
  rarityTo?: number;
  rarityEqual?: number;
};

type Sort = {
  [key: string]: 'asc' | 'desc' | undefined;
};

@Injectable({
  providedIn: 'root'
})
export class ArmorSetService {
  private data = inject(DatabaseService);

  @memoize
  list(
    filter?: Filter,
    sort?: Sort
  ) {
    return from(liveQuery(() => {
      if (this.data.isServer) return [];
      let filtered;
      if (filter?.name != null) {
        const name = filter.name.toLowerCase();
        filtered = this.data.armorSets.filter(obj => !!(obj.name?.en?.toLowerCase()?.includes(name) || obj.name?.zh?.toLowerCase()?.includes(name) || obj.name?.jp?.toLowerCase()?.includes(name)))
      } else if (filter?.rarityEqual != null) {
        filtered = this.data.armorSets.where('rarity').equals(filter.rarityEqual);
      } else if (filter?.rarityFrom != null && filter?.rarityTo != null) {
        filtered = this.data.armorSets.where('rarity').between(filter.rarityFrom, filter.rarityTo, true, true);
      } else if (filter?.rarityFrom != null) {
        filtered = this.data.armorSets.where('rarity').aboveOrEqual(filter.rarityFrom);
      } else if (filter?.rarityTo != null) {
        filtered = this.data.armorSets.where('rarity').belowOrEqual(filter.rarityTo);
      } else {
        filtered = this.data.armorSets.toCollection();
      }
      if (sort && Object.values(sort).filter(v => v == 'asc' || v == 'desc').length > 0) {
        const sortKey = Object.entries(sort).filter(([key, v]) => v == 'asc' || v == 'desc')[0][0];
        if (sort[sortKey] === 'desc') {
          return filtered.reverse().sortBy(sortKey);
        } else {
          return filtered.sortBy(sortKey);
        }
      } else {
        return filtered.toArray();
      }
    })).pipe(
      delayWhen((_, i) => i === 0 ? timer(1000) : of()),
      startWith(null),
      shareReplay(1),
    )
  }

  mainListFilter$$ = signal<Filter>({});
  mainListSort$$ = signal<Sort>({
    rarity: 'desc'
  });

  getOne = (
    id: string
  ) => liveQuery(() => {
    if (this.data.isServer) return undefined;
    return this.data.armorSets.get(id);
  })

  create = (input: Pick<ArmorSet, 'name' | 'rank' | 'rarity'>) => {
    const now = new Date();
    return from(this.data.armorSets.add({
      id: nanoid(),
      createdAt: now,
      updatedAt: now,
      ...input,
    }))
  }

  update = (id: string, input: Pick<ArmorSet, 'name' | 'rank' | 'rarity'>) => {
    return from(this.data.armorSets.update(
      id,
      {
        updatedAt: new Date(),
        ...input
      }
    ))
  }
}
