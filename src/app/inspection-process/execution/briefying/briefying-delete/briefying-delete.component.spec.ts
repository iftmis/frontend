import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefyingDeleteComponent } from './briefying-delete.component';

describe('BriefyingDeleteComponent', () => {
  let component: BriefyingDeleteComponent;
  let fixture: ComponentFixture<BriefyingDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BriefyingDeleteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefyingDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
