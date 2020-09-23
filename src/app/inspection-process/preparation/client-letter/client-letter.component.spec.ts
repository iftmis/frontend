import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLetterComponent } from './client-letter.component';

describe('ClientLetterComponent', () => {
  let component: ClientLetterComponent;
  let fixture: ComponentFixture<ClientLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClientLetterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
