import { MultilingualText } from './common';

export type Armor = {
  id: string;
  armorSetId: string;
  name: MultilingualText;
  rarity: number;
  rank: 'base' | 'iceborne';
  position: 'helm' | 'chest' | 'arms' | 'waist' | 'legs';
  image?: Blob;
  baseDef?: number;
  maxDef?: number;
  maxLevel?: number;
  slots?: number[];
  resistance: {
    fire?: number;
    water?: number;
    thunder?: number;
    ice?: number;
    dragon?: number;
  };
  materialIds?: never[];
  skills?: {
    skillId: never;
    level: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}