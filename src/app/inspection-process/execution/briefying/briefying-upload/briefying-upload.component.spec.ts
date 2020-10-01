import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefyingUploadComponent } from './briefying-upload.component';

describe('BriefyingUploadComponent', () => {
  let component: BriefyingUploadComponent;
  let fixture: ComponentFixture<BriefyingUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BriefyingUploadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefyingUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
