import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OrganisationUnitResolver } from './organisation-unit.resolver';

describe('OrganisationUnitResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: OrganisationUnitResolver = TestBed.inject(
      OrganisationUnitResolver
    );
    expect(service).toBeTruthy();
  });
});
