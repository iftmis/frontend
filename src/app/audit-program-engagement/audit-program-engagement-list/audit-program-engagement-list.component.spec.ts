import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../material/material.module';
import { AuditProgramEngagementListComponent } from './audit-program-engagement-list.component';

describe('AuditProgramEngagementListComponent', () => {
  let component: AuditProgramEngagementListComponent;
  let fixture: ComponentFixture<AuditProgramEngagementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuditProgramEngagementListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditProgramEngagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
