import { Injectable, inject, signal } from '@angular/core';
import { liveQuery } from 'dexie';
import { nanoid } from 'nanoid';
import { from, of, throwError } from 'rxjs';
import { ArmorCreateInput, ArmorUpdateInput } from '../data/armor';
import { DatabaseService } from './database.service';

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

  list(
    filter?: Filter,
    sort?: Sort
  ) {
    return from(liveQuery(() => {
      if (this.data.isServer) return [];
      let filtered;
      if (filter?.name != null) {
        filtered = this.data.armors.filter(obj => !!(obj.name?.en?.includes(filter.name!) || obj.name?.jp?.includes(filter.name!)))
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
    }))
  }

  count() {
    if (this.data.isServer) return of(0);
    return from(this.data.armors.count())
  }

  mainListFilter$$ = signal<Filter>({});
  mainListSort$$ = signal<Sort>({
    armorSetId: 'asc',
  });

  getOne(
    id: string
  ) {
    return from(liveQuery(() => {
      if (this.data.isServer) return undefined;
      return this.data.armors.get(id);
    }))
  }

  create = (input: ArmorCreateInput) => {
    if (input?.name == null || (input?.name.en == null && input?.name.jp == null)) return throwError(() => new Error('Name is required'))
    if (!input?.position) return throwError(() => new Error('Position is required'))
    if (!input?.armorSetId) return throwError(() => new Error('Armor Set ID is required'))
    const now = new Date();
    return from(this.data.armors.add({
      id: nanoid(),
      createdAt: now,
      updatedAt: now,
      ...input,
    }))
  }

  update = (id: string, input: ArmorUpdateInput) => {
    return from(this.data.armors.update(
      id,
      {
        updatedAt: new Date(),
        ...input,
      }
    ))
  }

  remove = (id: string) => {
    return from(this.data.armors.delete(id))
  }
}
