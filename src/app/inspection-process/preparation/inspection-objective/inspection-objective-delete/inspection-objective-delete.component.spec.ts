import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MaterialModule } from 'src/app/material/material.module';
import { InspectionObjectiveDeleteComponent } from './inspection-objective-delete.component';

describe('InspectionObjectiveDeleteComponent', () => {
  let component: InspectionObjectiveDeleteComponent;
  let fixture: ComponentFixture<InspectionObjectiveDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InspectionObjectiveDeleteComponent],
      imports: [NoopAnimationsModule, MaterialModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionObjectiveDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
