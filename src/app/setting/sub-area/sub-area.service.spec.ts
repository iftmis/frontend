import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SubAreaService } from './sub-area.service';

describe('SubAreaService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    })
  );

  it('should be created', () => {
    const service: SubAreaService = TestBed.inject(SubAreaService);
    expect(service).toBeTruthy();
  });
});
