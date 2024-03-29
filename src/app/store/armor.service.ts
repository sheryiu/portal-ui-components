import { Injectable, inject, signal } from '@angular/core';
import { liveQuery } from 'dexie';
import { nanoid } from 'nanoid';
import { delayWhen, from, of, shareReplay, startWith, timer } from 'rxjs';
import { Armor } from '../data/armor';
import { DatabaseService } from '../data/database.service';
import { memoize } from './memoize';

type Filter = {
  name?: string;
  armorSetId?: string;
};

type Sort = {
  [key: string]: 'asc' | 'desc' | undefined;
};

@Injectable({
  providedIn: 'root'
})
export class ArmorService {
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
        filtered = this.data.armors.filter(obj => !!(obj.name?.en?.includes(filter.name!) || obj.name?.zh?.includes(filter.name!) || obj.name?.jp?.includes(filter.name!)))
      } else if (filter?.armorSetId != null) {
        filtered = this.data.armors.where('armorSetId').equals(filter.armorSetId)
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
    })).pipe(
      delayWhen((_, i) => i === 0 ? timer(1000) : of()),
      startWith(null),
      shareReplay(1),
    )
  }

  mainListFilter$$ = signal<Filter>({});
  mainListSort$$ = signal<Sort>({
    armorSetId: 'asc',
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
      createdAt: now,
      updatedAt: now,
      ...input,
    }))
  }

  update = (id: string, input: Partial<Omit<Armor, 'id' | 'createdAt' | 'updatedAt'>>) => {
    return from(this.data.armors.update(
      id,
      {
        updatedAt: new Date(),
        ...input,
      }
    ))
  }
}
