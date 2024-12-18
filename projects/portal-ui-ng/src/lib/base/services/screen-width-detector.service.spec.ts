import { TestBed } from '@angular/core/testing';

import { ScreenWidthDetectorService } from './screen-width-detector.service';

describe('ScreenWidthDetectorService', () => {
  let service: ScreenWidthDetectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenWidthDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
