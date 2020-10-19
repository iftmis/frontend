import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefingDeleteComponent } from './briefing-delete.component';

describe('BriefingDeleteComponent', () => {
  let component: BriefingDeleteComponent;
  let fixture: ComponentFixture<BriefingDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BriefingDeleteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefingDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
