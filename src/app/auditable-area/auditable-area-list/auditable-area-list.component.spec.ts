import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../material/material.module';
import { AuditableAreaListComponent } from './auditable-area-list.component';

describe('AuditableAreaListComponent', () => {
  let component: AuditableAreaListComponent;
  let fixture: ComponentFixture<AuditableAreaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuditableAreaListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditableAreaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
