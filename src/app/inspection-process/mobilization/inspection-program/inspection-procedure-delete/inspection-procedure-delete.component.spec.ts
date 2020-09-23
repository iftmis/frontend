import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MaterialModule } from 'src/app/material/material.module';
import { InspectionProcedureDeleteComponent } from './inspection-procedure-delete.component';

describe('InspectionProcedureDeleteComponent', () => {
  let component: InspectionProcedureDeleteComponent;
  let fixture: ComponentFixture<InspectionProcedureDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionProcedureDeleteComponent],
      imports: [NoopAnimationsModule, MaterialModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionProcedureDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
