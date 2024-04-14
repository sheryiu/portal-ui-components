import { ArmorSet } from './armor-set';
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

export type ArmorSkill = {
  skillId: Skill['id'];
  levels: number;
}

export type Armor = Root & {
  armorSetId: ArmorSet['id'];
  position: ArmorPosition;
  image?: Blob;
  baseDef?: number;
  maxDef?: number;
  maxLevel?: number;
  decorationSlots?: number[];
  resistance?: ArmorResistance;
  skills?: ArmorSkill[];
}

export type ArmorCreateInput = {
  name: Armor['name'];
  armorSetId: Armor['armorSetId'];
  position: Armor['position'];
}