import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtesyDeleteComponent } from './courtesy-delete.component';

describe('CourtesyDeleteComponent', () => {
  let component: CourtesyDeleteComponent;
  let fixture: ComponentFixture<CourtesyDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CourtesyDeleteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourtesyDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
