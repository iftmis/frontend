import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../material/material.module';
import { InspectionPlanListComponent } from './inspection-plan-list.component';

describe('InspectionPlanListComponent', () => {
  let component: InspectionPlanListComponent;
  let fixture: ComponentFixture<InspectionPlanListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionPlanListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionPlanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
