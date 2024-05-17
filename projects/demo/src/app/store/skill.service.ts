import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { liveQuery } from 'dexie';
import Fuse, { FuseResultMatch } from 'fuse.js';
import { nanoid } from 'nanoid';
import { GlobalSearchProvider, GlobalSearchSuggestion, formatFuseText, isNonNull } from 'phead';
import { Observable, from, map, of, switchMap } from 'rxjs';
import { Skill } from '../data/skill';
import { DatabaseService } from './database.service';

type Filter = {
  name?: string;
};

type Sort = {
  [key: string]: 'asc' | 'desc' | undefined;
};

export type SkillCreateInput = Pick<Skill, 'name' | 'color' | 'description'>;
export type SkillLevelCreateInput = (Skill['levels'] & {})[number]

@Injectable({
  providedIn: 'root'
})
export class SkillService implements GlobalSearchProvider {
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
        const findName = filter.name!.toLowerCase();
        filtered = this.data.skills.filter(obj => !!(obj.name?.en?.toLowerCase().includes(findName) || obj.name?.jp?.toLowerCase().includes(findName)))
      } else {
        filtered = this.data.skills.toCollection();
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
    return from(this.data.skills.count())
  }

  mainListFilter$$ = signal<Filter>({});
  mainListSort$$ = signal<Sort>({
    name: 'desc'
  });

  getOne(
    id: string
  ) {
    return from(liveQuery(() => {
      if (this.data.isServer) return undefined;
      return this.data.skills.get(id);
    }))
  }

  create = (input: SkillCreateInput) => {
    const now = new Date();
    return from(this.data.skills.add({
      id: nanoid(),
      createdAt: now,
      updatedAt: now,
      ...input,
    }))
  }

  update = (id: string, input: Partial<Pick<Skill, 'name' | 'color' | 'description'>>) => {
    return from(this.data.skills.update(
      id,
      {
        updatedAt: new Date(),
        ...input
      }
    ))
  }

  remove = (id: string) => {
    return from(this.data.skills.delete(id));
  }

  addLevel = (id: string, input: (Skill['levels'] & {})[number]) => {
    return from(this.data.skills.where('id').equals(id).modify(skill => {
      skill.levels ??= [];
      skill.levels.push(input);
    }))
  }

  getSuggestions(searchTerm: Observable<string>): Observable<GlobalSearchSuggestion[]> {
    return searchTerm.pipe(
      switchMap(term => this.list().pipe(
        map(list => new Fuse(list, { includeScore: true, includeMatches: true, keys: ['name.jp', 'name.en'] }).search(term)),
      )),
      map(result => result.map(({ item, score, matches }) => ({
        title: formatTitle(item, matches),
        category: 'Skill',
        score: score!,
        onClick: () => this.router.navigate(['mhw', 'skill', item.id]),
      })))
    )
  }
}

function formatTitle(item: Skill, matches: readonly FuseResultMatch[] = []) {
  const nameJp = (matches.some(m => m.key === 'name.jp') && item.name?.jp) ? formatFuseText(item.name.jp, matches.find(m => m.key === 'name.jp')?.indices!) : undefined;
  const nameEn = (matches.some(m => m.key === 'name.en') && item.name?.en) ? formatFuseText(item.name.en, matches.find(m => m.key === 'name.en')?.indices!) : undefined;
  return [nameJp, nameEn].filter(isNonNull).join(' / ')
}
