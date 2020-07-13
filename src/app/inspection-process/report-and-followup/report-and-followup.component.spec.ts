import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAndFollowupComponent } from './report-and-followup.component';

describe('ReportAndFollowupComponent', () => {
  let component: ReportAndFollowupComponent;
  let fixture: ComponentFixture<ReportAndFollowupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportAndFollowupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportAndFollowupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
