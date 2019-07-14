import { TestBed } from '@angular/core/testing';

import { RemoveNamespaceService } from './remove-namespace.service';

describe('RemoveNamespaceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RemoveNamespaceService = TestBed.get(RemoveNamespaceService);
    expect(service).toBeTruthy();
  });
});
