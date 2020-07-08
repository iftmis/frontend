import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { OrganisationUnitService } from './organisation-unit.service';

describe('OrganisationUnitService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: OrganisationUnitService = TestBed.inject(
      OrganisationUnitService
    );
    expect(service).toBeTruthy();
  });
});
