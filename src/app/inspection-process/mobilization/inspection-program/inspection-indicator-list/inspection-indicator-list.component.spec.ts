import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../../../material/material.module';
import { InspectionIndicatorListComponent } from './inspection-indicator-list.component';

describe('InspectionIndicatorListComponent', () => {
  let component: InspectionIndicatorListComponent;
  let fixture: ComponentFixture<InspectionIndicatorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionIndicatorListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionIndicatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
