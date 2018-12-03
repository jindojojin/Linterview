import { TestBed } from '@angular/core/testing';

import { RoutGuardService } from './rout-guard.service';

describe('RoutGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoutGuardService = TestBed.get(RoutGuardService);
    expect(service).toBeTruthy();
  });
});
