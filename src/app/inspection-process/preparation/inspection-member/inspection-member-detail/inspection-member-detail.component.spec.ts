import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/material/material.module';
import { InspectionMemberDetailComponent } from './inspection-member-detail.component';

// tslint:disable-next-line
@Component({ selector: 'hip-ngx-error', template: '' })
class NgxErrorStubComponent {
  @Input() label: string;
  @Input() control: FormControl;
}

describe('InspectionMemberDetailComponent', () => {
  let component: InspectionMemberDetailComponent;
  let fixture: ComponentFixture<InspectionMemberDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionMemberDetailComponent, NgxErrorStubComponent],
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
    fixture = TestBed.createComponent(InspectionMemberDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
