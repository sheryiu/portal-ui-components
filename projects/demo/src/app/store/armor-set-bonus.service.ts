import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { liveQuery } from 'dexie';
import Fuse, { FuseResultMatch } from 'fuse.js';
import { nanoid } from 'nanoid';
import { GlobalSearchProvider, GlobalSearchSuggestion, formatFuseText, isNonNull } from 'phead';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { ArmorSetBonus } from '../data/armor-set-bonus';
import { Skill } from '../data/skill';
import { DatabaseService } from './database.service';

type Filter = {
  name?: string;
  skillId?: Skill['id'];
};

type Sort = {
  [key: string]: 'asc' | 'desc' | undefined;
};

export type ArmorSetBonusCreateInput = Pick<ArmorSetBonus, 'name'>;

@Injectable({
  providedIn: 'root'
})
export class ArmorSetBonusService implements GlobalSearchProvider {
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
        filtered = this.data.armorSetBonuses.filter(obj => !!(obj.name?.en?.toLowerCase()?.includes(name) || obj.name?.jp?.toLowerCase()?.includes(name)))
      } else if (filter?.skillId != null) {
        filtered = this.data.armorSetBonuses.where('skillId').equals(filter.skillId);
      } else {
        filtered = this.data.armorSetBonuses.toCollection();
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
    return from(this.data.armorSetBonuses.count())
  }

  mainListFilter$$ = signal<Filter>({});
  mainListSort$$ = signal<Sort>({});

  getOne(
    id: string
  ) {
    return from(liveQuery(() => {
      if (this.data.isServer) return undefined;
      return this.data.armorSetBonuses.get(id);
    }))
  }

  create = (input: ArmorSetBonusCreateInput) => {
    const now = new Date();
    return from(this.data.armorSetBonuses.add({
      id: nanoid(),
      createdAt: now,
      updatedAt: now,
      effects: [],
      ...input,
    }))
  }

  update = (id: string, input: Partial<Pick<ArmorSetBonus, 'name' | 'effects'>>) => {
    return from(this.data.armorSetBonuses.update(
      id,
      {
        updatedAt: new Date(),
        ...input
      }
    ))
  }

  remove = (id: string) => {
    return from(this.data.armorSetBonuses.delete(id));
  }

  getSuggestions(searchTerm: Observable<string>): Observable<GlobalSearchSuggestion[]> {
    return searchTerm.pipe(
      switchMap(term => this.list().pipe(
        map(list => new Fuse(list, { includeScore: true, includeMatches: true, keys: ['name.jp', 'name.en'] }).search(term)),
      )),
      map(result => result.map(({ item, score, matches }) => ({
        title: formatTitle(item, matches),
        category: 'Armor Set Bonus',
        score: score!,
        onClick: () => this.router.navigate(['mhw', 'armor-set-bonus', item.id]),
      })))
    )
  }
}

function formatTitle(item: ArmorSetBonus, matches: readonly FuseResultMatch[] = []) {
  const nameJp = (matches.some(m => m.key === 'name.jp') && item.name?.jp) ? formatFuseText(item.name.jp, matches.find(m => m.key === 'name.jp')?.indices!) : undefined;
  const nameEn = (matches.some(m => m.key === 'name.en') && item.name?.en) ? formatFuseText(item.name.en, matches.find(m => m.key === 'name.en')?.indices!) : undefined;
  return [nameJp, nameEn].filter(isNonNull).join(' / ')
}
