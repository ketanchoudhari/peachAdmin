import { TestBed } from '@angular/core/testing';

import { BetlistService } from './betlist.service';

describe('BetlistService', () => {
  let service: BetlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
