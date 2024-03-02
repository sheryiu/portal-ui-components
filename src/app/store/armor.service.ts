import { Injectable, inject, signal } from '@angular/core';
import { liveQuery } from 'dexie';
import { nanoid } from 'nanoid';
import { from } from 'rxjs';
import { Armor } from '../data/armor';
import { DatabaseService } from '../data/database.service';

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
export class ArmorService {
  private data = inject(DatabaseService);

  list = (
    filter?: Filter,
    sort?: Sort
  ) => liveQuery(() => {
    if (this.data.isServer) return [];
    let filtered;
    if (filter?.name != null) {
      filtered = this.data.armors.filter(obj => !!(obj.name.en?.includes(filter.name!) || obj.name.zh?.includes(filter.name!) || obj.name.jp?.includes(filter.name!)))
    } else if (filter?.rarityEqual != null) {
      filtered = this.data.armors.where('rarity').equals(filter.rarityEqual);
    } else if (filter?.rarityFrom != null && filter?.rarityTo != null) {
      filtered = this.data.armors.where('rarity').between(filter.rarityFrom, filter.rarityTo, true, true);
    } else if (filter?.rarityFrom != null) {
      filtered = this.data.armors.where('rarity').aboveOrEqual(filter.rarityFrom);
    } else if (filter?.rarityTo != null) {
      filtered = this.data.armors.where('rarity').belowOrEqual(filter.rarityTo);
    } else {
      filtered = this.data.armors.toCollection();
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
  });

  mainListFilter$$ = signal<Filter>({});
  mainListSort$$ = signal<Sort>({
    rarity: 'desc'
  });

  getOne = (
    id: string
  ) => liveQuery(() => {
    if (this.data.isServer) return undefined;
    return this.data.armors.get(id);
  })

  create = (input: Omit<Armor, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date();
    return from(this.data.armors.add({
      id: nanoid(),
      ...input,
      createdAt: now,
      updatedAt: now,
    }))
  }

  update = (id: string, input: Partial<Omit<Armor, 'id' | 'createdAt' | 'updatedAt'>>) => {
    return from(this.data.armors.update(
      id,
      {
        ...input,
        updatedAt: new Date(),
      }
    ))
  }
}
