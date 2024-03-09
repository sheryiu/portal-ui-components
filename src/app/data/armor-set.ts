import { Rank } from './common';
import { Root } from './root';

export type ArmorSet = Root & {
  rarity: number;
  rank: Rank;
}