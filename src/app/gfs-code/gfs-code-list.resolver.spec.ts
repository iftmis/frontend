import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GfsCodeListResolver } from './gfs-code-list.resolver';

describe('GfsCodeListResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it('should be created', () => {
    const service: GfsCodeListResolver = TestBed.inject(GfsCodeListResolver);
    expect(service).toBeTruthy();
  });
});
