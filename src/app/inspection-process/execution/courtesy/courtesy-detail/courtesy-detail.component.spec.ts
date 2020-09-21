import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtesyDetailComponent } from './courtesy-detail.component';

describe('CourtesyDetailComponent', () => {
  let component: CourtesyDetailComponent;
  let fixture: ComponentFixture<CourtesyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourtesyDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtesyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
