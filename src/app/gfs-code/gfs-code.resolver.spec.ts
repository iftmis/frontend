import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GfsCodeResolver } from './gfs-code.resolver';

describe('GfsCodeResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: GfsCodeResolver = TestBed.inject(GfsCodeResolver);
    expect(service).toBeTruthy();
  });
});
