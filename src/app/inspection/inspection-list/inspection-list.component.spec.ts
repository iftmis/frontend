import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../material/material.module';
import { InspectionListComponent } from './inspection-list.component';

describe('InspectionListComponent', () => {
  let component: InspectionListComponent;
  let fixture: ComponentFixture<InspectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
