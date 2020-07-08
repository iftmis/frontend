import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../material/material.module';
import { QuarterListComponent } from './quarter-list.component';

describe('QuarterListComponent', () => {
  let component: QuarterListComponent;
  let fixture: ComponentFixture<QuarterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuarterListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
