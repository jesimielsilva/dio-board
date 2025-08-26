import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelaBoardComponent } from './tela-board.component';

describe('TelaBoardComponent', () => {
  let component: TelaBoardComponent;
  let fixture: ComponentFixture<TelaBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TelaBoardComponent]
    });
    fixture = TestBed.createComponent(TelaBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
