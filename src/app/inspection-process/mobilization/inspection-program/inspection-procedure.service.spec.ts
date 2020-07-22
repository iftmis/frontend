import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InspectionProcedureService } from './inspection-procedure.service';

describe('InspectionProcedureService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: InspectionProcedureService = TestBed.inject(
      InspectionProcedureService
    );
    expect(service).toBeTruthy();
  });
});
