import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtesyMembersComponent } from './courtesy-members.component';

describe('CourtesyMembersComponent', () => {
  let component: CourtesyMembersComponent;
  let fixture: ComponentFixture<CourtesyMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourtesyMembersComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtesyMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
