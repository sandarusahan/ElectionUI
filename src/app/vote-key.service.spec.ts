import { TestBed } from '@angular/core/testing';

import { VoteKeyService } from './vote-key.service';

describe('VoteKeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoteKeyService = TestBed.get(VoteKeyService);
    expect(service).toBeTruthy();
  });
});
