import { ArmorResistance } from './armor';
import { MultilingualText } from './common';
import { Root } from './root';

export type GeneralSkillEffect = {
  type: 'general';
  description: MultilingualText;
}

export type AttackSkillEffect = {
  type: 'attack';
  description: MultilingualText;
  value: number;
  calculationType: 'additive' | 'multiplicative';
}

export type AffinitySkillEffect = {
  type: 'affinity';
  description: MultilingualText;
  value: number;
  calculationType: 'additive' | 'multiplicative';
}

export type DefenseSkillEffect = {
  type: 'defense';
  description: MultilingualText;
  value: number;
  calculationType: 'additive' | 'multiplicative';
}

export type ResistanceSkillEffect = {
  type: 'resistance';
  description: MultilingualText;
  value: number;
  calculationType: 'additive' | 'multiplicative';
  resistanceElement: 'all' | keyof ArmorResistance;
}

export type SkillEffect = GeneralSkillEffect |
  AttackSkillEffect |
  AffinitySkillEffect |
  DefenseSkillEffect |
  ResistanceSkillEffect;

export type SkillLevel = {
  description: MultilingualText;
  level: number;
  isLocked: boolean;
  effects?: SkillEffect[];
}

export type Skill = Root & {
  color: string;
  description?: MultilingualText;
  levels?: SkillLevel[];
}