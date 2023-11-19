import { TestBed } from '@angular/core/testing';

import { ListDemoService } from './list-demo.service';

describe('ListDemoService', () => {
  let service: ListDemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListDemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
