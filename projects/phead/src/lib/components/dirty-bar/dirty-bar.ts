import { makeEnvironmentProviders } from '@angular/core';
import { DirtyBarService } from './dirty-bar.service';

export function provideDirtyBar() {
  return makeEnvironmentProviders([
    DirtyBarService
  ])
}