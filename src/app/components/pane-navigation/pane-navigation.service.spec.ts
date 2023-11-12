import { TestBed } from '@angular/core/testing';

import { PaneNavigationService } from './pane-navigation.service';

describe('PaneNavigationService', () => {
  let service: PaneNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaneNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
