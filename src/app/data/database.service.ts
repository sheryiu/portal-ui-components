import { isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import Dexie from 'dexie';
import { Armor } from './armor';
import { ArmorSet } from './armor-set';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {
  armors!: Dexie.Table<Armor, string>;
  armorSets!: Dexie.Table<ArmorSet, string>;

  private platformId = inject(PLATFORM_ID);
  isServer = isPlatformServer(this.platformId);

  constructor() {
    super('database');
    if (this.isServer) return;
    this.version(2).stores({
      armors: 'id, rarity',
      armorSets: 'id, rarity',
    })
  }
}
