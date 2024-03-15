import { Root } from './root';
import { Skill } from './skill';

export type ArmorSetBonus = Root & {
  effects: ArmorSetBonusEffect[];
}

export type ArmorSetBonusEffect = {
  skillId: Skill['id'];
  requiredNumberOfParts: number;
}