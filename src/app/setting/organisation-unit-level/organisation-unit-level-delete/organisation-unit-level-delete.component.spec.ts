import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MaterialModule } from 'src/app/material/material.module';
import { OrganisationUnitLevelDeleteComponent } from './organisation-unit-level-delete.component';

describe('OrganisationUnitLevelDeleteComponent', () => {
  let component: OrganisationUnitLevelDeleteComponent;
  let fixture: ComponentFixture<OrganisationUnitLevelDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrganisationUnitLevelDeleteComponent],
      imports: [NoopAnimationsModule, MaterialModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationUnitLevelDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
