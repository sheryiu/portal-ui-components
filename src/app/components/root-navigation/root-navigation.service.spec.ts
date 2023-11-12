import { TestBed } from '@angular/core/testing';

import { RootNavigationService } from './root-navigation.service';

describe('RootNavigationService', () => {
  let service: RootNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RootNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
