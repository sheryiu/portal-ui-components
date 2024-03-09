import { ArmorSet } from './armor-set';
import { Root } from './root';
import { Skill } from './skill';

export type ArmorSetSetBonus = Root & {
  skillId: Skill['id'];
  requiredNumberOfParts: number;
  armorSetIds: ArmorSet['id'][];
}