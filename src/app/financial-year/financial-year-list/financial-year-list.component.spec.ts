import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../material/material.module';
import { FinancialYearListComponent } from './financial-year-list.component';

describe('FinancialYearListComponent', () => {
  let component: FinancialYearListComponent;
  let fixture: ComponentFixture<FinancialYearListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialYearListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialYearListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
