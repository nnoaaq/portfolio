import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuhelinComponent } from './puhelin.component';

describe('PuhelinComponent', () => {
  let component: PuhelinComponent;
  let fixture: ComponentFixture<PuhelinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuhelinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuhelinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
