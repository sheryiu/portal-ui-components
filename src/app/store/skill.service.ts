import { Injectable, inject, signal } from '@angular/core';
import { liveQuery } from 'dexie';
import { nanoid } from 'nanoid';
import { from } from 'rxjs';
import { DatabaseService } from '../data/database.service';
import { Skill } from '../data/skill';

type Filter = {
  name?: string;
};

type Sort = {
  [key: string]: 'asc' | 'desc' | undefined;
};

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private data = inject(DatabaseService);

  list(
    filter?: Filter,
    sort?: Sort
  ) {
    return from(liveQuery(() => {
      if (this.data.isServer) return [];
      let filtered;
      if (filter?.name != null) {
        const findName = filter.name!.toLowerCase();
        filtered = this.data.skills.filter(obj => !!(obj.name.en?.toLowerCase().includes(findName) || obj.name.jp?.toLowerCase().includes(findName)))
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

  create = (input: Pick<Skill, 'name' | 'color' | 'description'>) => {
    const now = new Date();
    return from(this.data.skills.add({
      id: nanoid(),
      createdAt: now,
      updatedAt: now,
      ...input,
    }))
  }

  update = (id: string, input: Partial<Pick<Skill, 'name' | 'color' | 'description' | 'levels'>>) => {
    return from(this.data.skills.update(
      id,
      {
        updatedAt: new Date(),
        ...input
      }
    ))
  }
}
