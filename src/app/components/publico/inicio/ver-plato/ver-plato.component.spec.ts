import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPlatoComponent } from './ver-plato.component';

describe('VerPlatoComponent', () => {
  let component: VerPlatoComponent;
  let fixture: ComponentFixture<VerPlatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerPlatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
