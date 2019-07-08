import { TestBed } from '@angular/core/testing';

import { IdGenerateService } from './id-generate.service';

describe('IdGenerateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdGenerateService = TestBed.get(IdGenerateService);
    expect(service).toBeTruthy();
  });
});
