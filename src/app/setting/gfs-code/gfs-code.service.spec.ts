import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GfsCodeService } from './gfs-code.service';

describe('GfsCodeService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: GfsCodeService = TestBed.inject(GfsCodeService);
    expect(service).toBeTruthy();
  });
});
