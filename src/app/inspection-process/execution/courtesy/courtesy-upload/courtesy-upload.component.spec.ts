import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtesyUploadComponent } from './courtesy-upload.component';

describe('CourtesyUploadComponent', () => {
  let component: CourtesyUploadComponent;
  let fixture: ComponentFixture<CourtesyUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourtesyUploadComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtesyUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
