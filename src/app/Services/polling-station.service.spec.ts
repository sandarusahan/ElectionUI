import { TestBed } from '@angular/core/testing';

import { PollingStationService } from './polling-station.service';

describe('PollingStationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PollingStationService = TestBed.get(PollingStationService);
    expect(service).toBeTruthy();
  });
});
