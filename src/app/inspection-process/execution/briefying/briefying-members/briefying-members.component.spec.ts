import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefyingMembersComponent } from './briefying-members.component';

describe('BriefyingMembersComponent', () => {
  let component: BriefyingMembersComponent;
  let fixture: ComponentFixture<BriefyingMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BriefyingMembersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefyingMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
