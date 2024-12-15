import { TestBed } from '@angular/core/testing';

import { ActionDrawerOverlayService } from './action-drawer-overlay.service';

describe('ActionDrawerOverlayService', () => {
  let service: ActionDrawerOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActionDrawerOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
