import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilizationComponent } from './mobilization.component';

describe('MobilizationComponent', () => {
  let component: MobilizationComponent;
  let fixture: ComponentFixture<MobilizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MobilizationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
