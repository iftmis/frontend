import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MaterialModule } from 'src/app/material/material.module';
import { InspectionIndicatorDeleteComponent } from './inspection-indicator-delete.component';

describe('InspectionIndicatorDeleteComponent', () => {
  let component: InspectionIndicatorDeleteComponent;
  let fixture: ComponentFixture<InspectionIndicatorDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionIndicatorDeleteComponent],
      imports: [NoopAnimationsModule, MaterialModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionIndicatorDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
