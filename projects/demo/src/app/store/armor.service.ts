import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { liveQuery } from 'dexie';
import Fuse, { FuseResultMatch } from 'fuse.js';
import { nanoid } from 'nanoid';
import { GlobalSearchProvider, GlobalSearchSuggestion, formatFuseText, isNonNull } from 'portal-ui-ng';
import { Observable, from, map, of, switchMap, throwError } from 'rxjs';
import { Armor, ArmorCreateInput, ArmorUpdateInput } from '../data/armor';
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
export class ArmorService implements GlobalSearchProvider {
  private data = inject(DatabaseService);
  private router = inject(Router);

  list(
    filter?: Filter,
    sort?: Sort
  ) {
    return from(liveQuery(() => {
      if (this.data.isServer) return [];
      let filtered;
      if (filter?.name != null) {
        filtered = this.data.armors.filter(obj => !!(obj.name?.en?.toLowerCase()?.includes(filter.name!.toLowerCase()) || obj.name?.jp?.toLowerCase()?.includes(filter.name!.toLowerCase())))
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

  getSuggestions(searchTerm: Observable<string>): Observable<GlobalSearchSuggestion[]> {
    return searchTerm.pipe(
      switchMap(term => this.list().pipe(
        map(list => new Fuse(list, { includeScore: true, includeMatches: true, keys: ['name.jp', 'name.en'] }).search(term)),
      )),
      map(result => result.map(({ item, score, matches }) => ({
        title: formatTitle(item, matches),
        category: 'Armor',
        score: score!,
        onClick: () => this.router.navigate(['mhw', 'armor', item.id]),
      })))
    )
  }
}

function formatTitle(item: Armor, matches: readonly FuseResultMatch[] = []) {
  const nameJp = (matches.some(m => m.key === 'name.jp') && item.name?.jp) ? formatFuseText(item.name.jp, matches.find(m => m.key === 'name.jp')?.indices!) : undefined;
  const nameEn = (matches.some(m => m.key === 'name.en') && item.name?.en) ? formatFuseText(item.name.en, matches.find(m => m.key === 'name.en')?.indices!) : undefined;
  return [nameJp, nameEn].filter(isNonNull).join(' / ')
}