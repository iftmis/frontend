import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from 'src/app/material/material.module';
import { FindingCategoryDetailComponent } from './finding-category-detail.component';

// tslint:disable-next-line
@Component({ selector: 'hip-ngx-error', template: '' })
class NgxErrorStubComponent {
  @Input() label: string;
  @Input() control: FormControl;
}

describe('FindingCategoryDetailComponent', () => {
  let component: FindingCategoryDetailComponent;
  let fixture: ComponentFixture<FindingCategoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FindingCategoryDetailComponent, NgxErrorStubComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        MaterialModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindingCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
