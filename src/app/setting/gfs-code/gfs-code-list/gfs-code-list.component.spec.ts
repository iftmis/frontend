import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../../../material/material.module';
import { GfsCodeListComponent } from './gfs-code-list.component';

describe('GfsCodeListComponent', () => {
  let component: GfsCodeListComponent;
  let fixture: ComponentFixture<GfsCodeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GfsCodeListComponent],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GfsCodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
