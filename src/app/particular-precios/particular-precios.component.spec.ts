import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularPreciosComponent } from './particular-precios.component';

describe('ParticularPreciosComponent', () => {
  let component: ParticularPreciosComponent;
  let fixture: ComponentFixture<ParticularPreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticularPreciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticularPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
