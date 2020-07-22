import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/material/material.module';
import { InspectionProcedureDetailComponent } from './inspection-procedure-detail.component';

// tslint:disable-next-line
@Component({ selector: 'hip-ngx-error', template: '' })
class NgxErrorStubComponent {
  @Input() label: string;
  @Input() control: FormControl;
}

describe('InspectionProcedureDetailComponent', () => {
  let component: InspectionProcedureDetailComponent;
  let fixture: ComponentFixture<InspectionProcedureDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionProcedureDetailComponent, NgxErrorStubComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionProcedureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
