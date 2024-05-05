import { ArmorResistance } from './armor';
import { MultilingualText } from './common';
import { Root } from './root';

export type AttackSkillEffect = {
  type: 'attack';
  value: number;
  calculationType: 'additive' | 'multiplicative';
}

export type AffinitySkillEffect = {
  type: 'affinity';
  value: number;
  calculationType: 'additive' | 'multiplicative';
}

export type DefenseSkillEffect = {
  type: 'defense';
  value: number;
  calculationType: 'additive' | 'multiplicative';
}

export type ElementalAttackSkillEffect = {
  type: 'elementalAttack';
  value: number;
  calculationType: 'additive' | 'multiplicative';
  element: keyof ArmorResistance;
}

export type ResistanceSkillEffect = {
  type: 'resistance';
  value: number;
  calculationType: 'additive' | 'multiplicative';
  element: keyof ArmorResistance;
}

export type SkillEffect = AttackSkillEffect |
  AffinitySkillEffect |
  DefenseSkillEffect |
  ElementalAttackSkillEffect |
  ResistanceSkillEffect;

export type SkillLevel = {
  description: MultilingualText;
  level: number;
  isLocked: boolean;
  effects?: SkillEffect[];
  conditions?: any[];
  duration?: number;
}

export type Skill = Root & {
  color: string;
  description?: MultilingualText;
  levels?: SkillLevel[];
}