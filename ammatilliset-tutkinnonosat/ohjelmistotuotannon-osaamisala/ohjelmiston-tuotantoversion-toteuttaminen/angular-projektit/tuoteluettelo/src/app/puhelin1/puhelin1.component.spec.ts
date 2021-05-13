import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Puhelin1Component } from './puhelin1.component';

describe('Puhelin1Component', () => {
  let component: Puhelin1Component;
  let fixture: ComponentFixture<Puhelin1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Puhelin1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Puhelin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
