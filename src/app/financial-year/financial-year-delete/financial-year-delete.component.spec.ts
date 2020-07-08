import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MaterialModule } from 'src/app/material/material.module';
import { FinancialYearDeleteComponent } from './financial-year-delete.component';

describe('FinancialYearDeleteComponent', () => {
  let component: FinancialYearDeleteComponent;
  let fixture: ComponentFixture<FinancialYearDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialYearDeleteComponent],
      imports: [NoopAnimationsModule, MaterialModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialYearDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
