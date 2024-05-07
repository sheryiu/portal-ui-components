import { Data } from '@angular/router';
import { nanoid } from 'nanoid';

const SYMBOL = Symbol('layered container data');

export function getLayeredContainerData(routeData: Data | undefined): { animation: string; displayType: 'half' | 'full'; } | undefined {
  return routeData?.[SYMBOL];
}

export function layeredContainer(type: 'half' | 'full') {
  return {
    [SYMBOL]: {
      animation: nanoid(),
      displayType: type,
    }
  }
}