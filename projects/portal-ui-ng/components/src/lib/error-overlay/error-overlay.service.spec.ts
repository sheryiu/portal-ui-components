import { TestBed } from '@angular/core/testing';

import { ErrorOverlayService } from './error-overlay.service';

describe('ErrorOverlayService', () => {
  let service: ErrorOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
