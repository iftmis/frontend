import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SubAreaListResolver } from './sub-area-list.resolver';

describe('SubAreaListResolver', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientModule] })
  );

  it('should be created', () => {
    const service: SubAreaListResolver = TestBed.inject(SubAreaListResolver);
    expect(service).toBeTruthy();
  });
});
