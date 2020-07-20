import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InpectionPlanningComponent } from './inpection-planning.component';

describe('InpectionPlanningComponent', () => {
  let component: InpectionPlanningComponent;
  let fixture: ComponentFixture<InpectionPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InpectionPlanningComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InpectionPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
