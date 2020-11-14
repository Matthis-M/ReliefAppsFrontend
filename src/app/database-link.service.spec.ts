import { TestBed } from '@angular/core/testing';

import { DatabaseLinkService } from './database-link.service';

describe('DatabaseLinkService', () => {
  let service: DatabaseLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
