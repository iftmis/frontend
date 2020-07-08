import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OrganisationUnitLevelResolver } from './organisation-unit-level.resolver';

describe('OrganisationUnitLevelResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: OrganisationUnitLevelResolver = TestBed.inject(
      OrganisationUnitLevelResolver
    );
    expect(service).toBeTruthy();
  });
});
