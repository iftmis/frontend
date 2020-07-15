import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { InspectionMemberService } from './inspection-member.service';

describe('InspectionMemberService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: InspectionMemberService = TestBed.inject(
      InspectionMemberService
    );
    expect(service).toBeTruthy();
  });
});
