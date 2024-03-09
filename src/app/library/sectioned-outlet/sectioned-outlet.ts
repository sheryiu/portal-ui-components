import { Data } from '@angular/router';
import { nanoid } from 'nanoid';

const OUTLET_SYMBOL = Symbol('sectioned outlet data');

export function getSectionedOutletData(routeData: Data | undefined): { animation: string; displayType: 'half' | 'full'; } | undefined {
  return routeData?.[OUTLET_SYMBOL];
}

export function sectionedOutlet(type: 'half' | 'full') {
  return {
    [OUTLET_SYMBOL]: {
      animation: nanoid(),
      displayType: type,
    }
  }
}