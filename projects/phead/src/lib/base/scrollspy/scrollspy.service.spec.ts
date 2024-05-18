import { TestBed } from '@angular/core/testing';

import { ScrollspyService } from './scrollspy.service';

describe('ScrollspyService', () => {
  let service: ScrollspyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollspyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
