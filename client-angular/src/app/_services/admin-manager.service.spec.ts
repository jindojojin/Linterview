import { TestBed } from '@angular/core/testing';

import { AdminManagerService } from './admin-manager.service';

describe('AdminManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminManagerService = TestBed.get(AdminManagerService);
    expect(service).toBeTruthy();
  });
});
