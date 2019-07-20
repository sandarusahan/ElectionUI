import { TestBed } from '@angular/core/testing';

import { ElectionResultService } from './election-result.service';

describe('ElectionResultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElectionResultService = TestBed.get(ElectionResultService);
    expect(service).toBeTruthy();
  });
});
