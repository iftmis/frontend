import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SubAreaResolver } from './sub-area.resolver';

describe('SubAreaResolveService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: SubAreaResolver = TestBed.inject(SubAreaResolver);
    expect(service).toBeTruthy();
  });
});
