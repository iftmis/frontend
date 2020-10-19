import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefingUploadComponent } from './briefing-upload.component';

describe('BriefingUploadComponent', () => {
  let component: BriefingUploadComponent;
  let fixture: ComponentFixture<BriefingUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BriefingUploadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefingUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
