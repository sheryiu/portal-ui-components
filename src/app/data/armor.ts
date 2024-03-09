import { ArmorSet } from './armor-set';
import { Rank } from './common';
import { Root } from './root';
import { Skill } from './skill';

export enum ArmorPosition {
  Helm = 'helm',
  Chest = 'chest',
  Arms = 'arms',
  Waist = 'waist',
  Legs = 'legs',
}

export type ArmorResistance = {
  fire?: number;
  water?: number;
  thunder?: number;
  ice?: number;
  dragon?: number;
}

export type ArmorEffect = {
  skillId: Skill['id'];
  levels: number;
}

export type Armor = Root & {
  armorSetId: ArmorSet['id'];
  rarity: number;
  rank: Rank;
  position: ArmorPosition;
  image?: Blob;
  baseDef?: number;
  maxDef?: number;
  maxLevel?: number;
  decorationSlots?: number[];
  resistance?: ArmorResistance;
  effects?: ArmorEffect[];
  createdAt: Date;
  updatedAt: Date;
}