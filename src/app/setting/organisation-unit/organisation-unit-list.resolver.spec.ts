import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OrganisationUnitListResolver } from './organisation-unit-list.resolver';

describe('OrganisationUnitListResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it('should be created', () => {
    const service: OrganisationUnitListResolver = TestBed.inject(
      OrganisationUnitListResolver
    );
    expect(service).toBeTruthy();
  });
});
