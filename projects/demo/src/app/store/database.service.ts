import { isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import Dexie from 'dexie';
import { Observable, from, map, startWith, switchMap } from 'rxjs';
import { Armor } from '../data/armor';
import { ArmorSet } from '../data/armor-set';
import { ArmorSetBonus } from '../data/armor-set-bonus';
import { Skill } from '../data/skill';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {
  armors!: Dexie.Table<Armor, string>;
  armorSets!: Dexie.Table<ArmorSet, string>;
  armorSetBonuses!: Dexie.Table<ArmorSetBonus, string>;
  skills!: Dexie.Table<Skill, string>;

  private platformId = inject(PLATFORM_ID);
  isServer = isPlatformServer(this.platformId);

  bytesUsed$;

  constructor() {
    super('database');
    if (this.isServer) return;
    import("dexie-export-import")
    this.version(8).stores({
      armors: 'id, armorSetId',
      armorSets: 'id, rarity, setBonusId',
      armorSetBonuses: 'id, skillId',
      skills: 'id',
    })

    this.bytesUsed$ = new Observable(subscriber => {
      if (this.isServer) return;
      const listener = () => {
        subscriber.next(null);
      }
      Dexie.on('storagemutated', listener);
      return () => Dexie.on('storagemutated').unsubscribe(listener);
    }).pipe(
      startWith(null),
      switchMap(() => from(navigator.storage.estimate())),
      map(storage => ({
        used: storage.usage,
        percentage: (storage.usage ?? 0) / (storage.quota ?? 1)
      }))
    )
  }

  emptyDatabase() {
    return this.delete().then(() => {
      location.reload();
    });
  }
}
