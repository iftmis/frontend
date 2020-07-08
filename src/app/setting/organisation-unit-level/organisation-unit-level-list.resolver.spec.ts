import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OrganisationUnitLevelListResolver } from './organisation-unit-level-list.resolver';

describe('OrganisationUnitLevelListResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it('should be created', () => {
    const service: OrganisationUnitLevelListResolver = TestBed.inject(
      OrganisationUnitLevelListResolver
    );
    expect(service).toBeTruthy();
  });
});
