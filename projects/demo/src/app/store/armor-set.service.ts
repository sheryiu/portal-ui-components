import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { liveQuery } from 'dexie';
import Fuse, { FuseResultMatch } from 'fuse.js';
import { nanoid } from 'nanoid';
import { GlobalSearchProvider, GlobalSearchSuggestion, formatFuseText, isNonNull } from 'portal-ui-ng';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { ArmorSet } from '../data/armor-set';
import { DatabaseService } from './database.service';

type Filter = {
  name?: string;
  rarityFrom?: number;
  rarityTo?: number;
  rarityEqual?: number;
};

type Sort = {
  [key: string]: 'asc' | 'desc' | undefined;
};

export type ArmorSetCreateInput = Pick<ArmorSet, 'name' | 'rank' | 'rarity'>;

@Injectable({
  providedIn: 'root'
})
export class ArmorSetService implements GlobalSearchProvider {
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
        const name = filter.name.toLowerCase();
        filtered = this.data.armorSets.filter(obj => !!(obj.name?.en?.toLowerCase()?.includes(name) || obj.name?.jp?.toLowerCase()?.includes(name)))
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
    }))
  }

  count() {
    if (this.data.isServer) return of(0);
    return from(this.data.armorSets.count())
  }

  mainListFilter$$ = signal<Filter>({});
  mainListSort$$ = signal<Sort>({
    rarity: 'desc'
  });

  getOne(
    id: string
  ) {
    return from(liveQuery(() => {
      if (this.data.isServer) return undefined;
      return this.data.armorSets.get(id);
    }))
  }

  create = (input: ArmorSetCreateInput) => {
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
        ...(typeof input.name != 'undefined' ? { name: input.name } : {}),
        ...(typeof input.rank != 'undefined' ? { rank: input.rank } : {}),
        ...(typeof input.rarity != 'undefined' ? { rarity: input.rarity } : {}),
      }
    ))
  }

  getSuggestions(searchTerm: Observable<string>): Observable<GlobalSearchSuggestion[]> {
    return searchTerm.pipe(
      switchMap(term => this.list().pipe(
        map(list => new Fuse(list, { includeScore: true, includeMatches: true, keys: ['name.jp', 'name.en'] }).search(term)),
      )),
      map(result => result.map(({ item, score, matches }) => ({
        title: formatTitle(item, matches),
        category: 'Armor Set',
        score: score!,
        onClick: () => this.router.navigate(['mhw', 'armor-set', item.id]),
      })))
    )
  }
}

function formatTitle(item: ArmorSet, matches: readonly FuseResultMatch[] = []) {
  const nameJp = (matches.some(m => m.key === 'name.jp') && item.name?.jp) ? formatFuseText(item.name.jp, matches.find(m => m.key === 'name.jp')?.indices!) : undefined;
  const nameEn = (matches.some(m => m.key === 'name.en') && item.name?.en) ? formatFuseText(item.name.en, matches.find(m => m.key === 'name.en')?.indices!) : undefined;
  return [nameJp, nameEn].filter(isNonNull).join(' / ')
}
