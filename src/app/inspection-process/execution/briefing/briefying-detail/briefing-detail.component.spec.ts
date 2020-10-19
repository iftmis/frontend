import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefingDetailComponent } from './briefing-detail.component';

describe('BriefingDetailComponent', () => {
  let component: BriefingDetailComponent;
  let fixture: ComponentFixture<BriefingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BriefingDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
