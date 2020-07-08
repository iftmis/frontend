import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OrganisationUnitLevelService } from './organisation-unit-level.service';

describe('OrganisationUnitLevelService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: OrganisationUnitLevelService = TestBed.inject(
      OrganisationUnitLevelService
    );
    expect(service).toBeTruthy();
  });
});
