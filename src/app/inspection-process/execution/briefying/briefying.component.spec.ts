import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefyingComponent } from './briefying.component';

describe('BriefyingComponent', () => {
  let component: BriefyingComponent;
  let fixture: ComponentFixture<BriefyingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BriefyingComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefyingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
