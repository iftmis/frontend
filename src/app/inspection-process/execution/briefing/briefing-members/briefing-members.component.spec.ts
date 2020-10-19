import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefingMembersComponent } from './briefing-members.component';

describe('BriefingMembersComponent', () => {
  let component: BriefingMembersComponent;
  let fixture: ComponentFixture<BriefingMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BriefingMembersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefingMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
