import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefyingDetailComponent } from './briefying-detail.component';

describe('BriefyingDetailComponent', () => {
  let component: BriefyingDetailComponent;
  let fixture: ComponentFixture<BriefyingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BriefyingDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefyingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
