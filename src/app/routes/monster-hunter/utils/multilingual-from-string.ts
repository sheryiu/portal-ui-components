import { franc } from 'franc-min';
import { MultilingualText } from '../../../data/common';

export function multilingualFromString(value: string) {
  const lang = franc(value, { only: ['jpn', 'eng'], minLength: 1 });
  let returnValue: MultilingualText;
  if (lang === 'jpn') returnValue = { jp: value };
  else returnValue = { en: value };
  return returnValue;
}