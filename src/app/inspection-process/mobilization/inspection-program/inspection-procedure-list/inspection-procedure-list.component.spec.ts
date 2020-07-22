import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../../../material/material.module';
import { InspectionProcedureListComponent } from './inspection-procedure-list.component';

describe('InspectionProcedureListComponent', () => {
  let component: InspectionProcedureListComponent;
  let fixture: ComponentFixture<InspectionProcedureListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionProcedureListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionProcedureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
